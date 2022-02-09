import { Modal } from 'bootstrap';
import { modals } from '../constants';

const headerListeners = () => {
  const hamburger = document.querySelector('.hamburger') as HTMLDivElement;

  const btnLogin = document.querySelector('#btn-login') as HTMLButtonElement;

  modals[0] = new Modal(document.getElementById('login-modal') as HTMLDivElement);

  btnLogin.addEventListener('click', () => {
    modals[0].show();
  });

  hamburger.addEventListener('click', () => {
    const menu = document.querySelector('.menu') as HTMLDivElement;
    menu.classList.add('active');
  });
};

export default headerListeners;
