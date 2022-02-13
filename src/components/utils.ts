import addMainContent from '../pages/addMainContent';
import { getMainPageElement } from '../pages/main/mainPage';
import authStore from '../store/authStore';
import renderHeader from './header';
import { IAuth } from './interfaces';

export function getLocalUser() {
  if (localStorage.getItem('auth')) {
    const localUser = JSON.parse(localStorage.getItem('auth')!) as IAuth;
    Object.entries(localUser).forEach((line) => {
      const key = line[0];
      const value = line[1] as string;
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
