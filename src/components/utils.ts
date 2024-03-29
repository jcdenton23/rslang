import router from '../router';
import authStore from '../store/authStore';
import { Routes } from './enum';
import renderHeader from './header';
import { IAuth } from './interfaces';
import { clearStatistics } from './statistic/utils';

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
  clearStatistics();
  const statisticsLink = document.querySelector('.statistic-link') as HTMLElement;
  statisticsLink.classList.add('hide');
  localStorage.removeItem('auth');
  document.querySelector('.header')?.remove();
  renderHeader();
  router.push(Routes.main);
}
