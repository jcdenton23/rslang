import modalStore from '../../store/modalStore';
import { logout } from '../utils';

export default function createLoginListeners() {
  const btn = document.querySelector('.authorized-user button') as HTMLButtonElement;

  btn.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.closest('#btn-login')) {
      modalStore.modal?.show();
    } else if (target.closest('#btn-logout')) {
      logout();
      createLoginListeners();
    }
  });
}
