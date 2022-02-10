import { Modal } from 'bootstrap';
import { modals } from '../constants';
import logout from './logout';

export default function createLoginListeners() {
  modals[0] = new Modal(document.getElementById('login-modal') as HTMLDivElement);

  if (document.querySelector('#btn-login')) {
    const btnLogin = document.querySelector('#btn-login') as HTMLButtonElement;

    btnLogin.addEventListener('click', () => {
      modals[0].show();
    });
  }

  if (document.querySelector('#btn-logout')) {
    const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

    btnLogout.addEventListener('click', () => {
      logout();
      createLoginListeners();
    });
  }
}
