import modalStore from '../../store/modalStore';
import { logout } from '../utils';

export default function createLoginListeners() {
  // modals[0] = new Modal(document.getElementById('login-modal') as HTMLDivElement);

  if (document.querySelector('#btn-login')) {
    const btnLogin = document.querySelector('#btn-login') as HTMLButtonElement;

    btnLogin.addEventListener('click', () => {
      modalStore.modal?.show();
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
