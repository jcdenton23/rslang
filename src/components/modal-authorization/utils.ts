import router from '../../router';
import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import modalStore from '../../store/modalStore';
import { Method, Routes } from '../enum';
import renderHeader from '../header';
import createLoginListeners from '../header/createLoginListeners';
import { IAuth, IUser } from '../interfaces';
import getAllUserWords from '../words/getUserWords';

function clearForm() {
  document.querySelectorAll('#login-modal form')?.forEach((form) => {
    const currentForm = form as HTMLFormElement;
    currentForm.reset();
  });
}

export async function signIn(user: IUser, finallyCallback: () => void) {
  const url = `${BASE_LINK}signin`;
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const statisticsLink = document.querySelector('.statistic-link') as HTMLElement;
  statisticsLink.classList.remove('hide');

  const request = {
    url,
    finallyCallback,
    options: {
      method: Method.POST,
      body: JSON.stringify(user),
      headers,
    },
    showNotification: true,
  };

  const response = await fetchWithErrorHandling<IAuth>(request);

  if (response) {
    modalStore.modal?.hide();
    authStore.message = response.message;
    authStore.token = response.token;
    authStore.refreshToken = response.refreshToken;
    authStore.userId = response.userId;
    authStore.name = response.name;
    localStorage.setItem('auth', JSON.stringify(authStore));
    document.querySelector('.header')?.remove();
    renderHeader();
    createLoginListeners();
    clearForm();
    getAllUserWords();
    router.push(Routes.main);
  }
}

export async function signUp(user: IUser, finallyCallback: () => void) {
  const url = `${BASE_LINK}users`;
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const request = {
    url,
    finallyCallback,
    options: {
      method: Method.POST,
      body: JSON.stringify(user),
      headers,
    },
    showNotification: true,
  };

  const response = await fetchWithErrorHandling<IAuth>(request);

  if (response) {
    signIn(user, finallyCallback);
  }
}
