import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import { auth } from '../constants';
import renderHeader from '../header';

export default function logout() {
  Object.keys(auth).forEach((key) => {
    auth[key] = '';
  });

  localStorage.removeItem('auth');
  document.querySelector('.header')?.remove();
  renderHeader();
  addMainContent(getMainPageElement());
}
