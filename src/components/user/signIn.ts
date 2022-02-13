import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import BASE_LINK from '../../services/settings';
import authStore from '../../store/authStore';
import modalStore from '../../store/modalStore';
import { Method } from '../enum';
import renderHeader from '../header';
import { IAuth, IUser } from '../interfaces';
import createLoginListeners from '../header/createLoginListeners';

function clearForm() {
  document.querySelectorAll('#login-modal form')?.forEach((form) => {
    const currentForm = form as HTMLFormElement;
    currentForm.reset();
  });
}

export default async function signIn(user: IUser, finallyCallback: () => void) {
  const url = `${BASE_LINK}signin`;
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const request: IAuth = await fetchWithErrorHandling(url, finallyCallback, {
    method: Method.POST,
    body: JSON.stringify(user),
    headers,
  });

  if (request) {
    modalStore.modal?.hide();
    authStore.message = request.message;
    authStore.token = request.token;
    authStore.refreshToken = request.refreshToken;
    authStore.userId = request.userId;
    authStore.name = request.name;
    localStorage.setItem('auth', JSON.stringify(authStore));
    document.querySelector('.header')?.remove();
    renderHeader();
    createLoginListeners();
    clearForm();
  }
}
