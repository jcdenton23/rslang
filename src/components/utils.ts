import addMainContent from '../pages/addMainContent';
import { getMainPageElement } from '../pages/main/mainPage';
import authStore from '../store/authStore';
import renderHeader from './header';
import { IAuth } from './interfaces';

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

export const getHeaderForUser = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });
