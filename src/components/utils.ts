import addMainContent from '../pages/addMainContent';
import { getMainPageElement } from '../pages/main/mainPage';
import { BASE_LINK } from '../services/constants';
import fetchWithErrorHandling from '../services/fetchWithErrorHandling';
import authStore from '../store/authStore';
import userWordsStore from '../store/userWordsStore';
import renderHeader from './header';
import { IAuth, IRequests, IResponseBodyWord } from './interfaces';

export function getLocalUser() {
  const localUser = JSON.parse(localStorage.getItem('auth')!) as IAuth;
  if (localUser) {
    Object.entries(localUser).forEach((line) => {
      const [key, value] = line;
      authStore[key] = value;
    });
  }
}

export function logout() {
  Object.keys(authStore).forEach((key) => {
    authStore[key] = '';
  });

  localStorage.removeItem('auth');
  document.querySelector('.header')?.remove();
  renderHeader();
  addMainContent(getMainPageElement());
}

export async function getAllUserWords() {
  const url = `${BASE_LINK}users/${authStore.userId}/words`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const request: IRequests = {
    url,
    options: { headers },
    showNotification: false,
  };

  const response = (await fetchWithErrorHandling(request)) as IResponseBodyWord[];

  userWordsStore.words = response || [];
}
