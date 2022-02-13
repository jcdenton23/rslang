import { Modal } from 'bootstrap';
import modalStore from '../../store/modalStore';
import { IUser } from '../interfaces';
import renderSpinner from '../Spinner/renderSpinner';
import { signIn, signUp } from './utils';

export default function createModalListeners(modal: HTMLDivElement) {
  modalStore.modal = new Modal(modal);

  const formSignIn = modal.querySelector('#form-signin') as HTMLFormElement;
  formSignIn.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = formSignIn.querySelector('.btn') as HTMLFormElement;
    btn.disabled = true;
    const spinner = renderSpinner('white', 16);
    const finallyCallback = () => {
      spinner.remove();
      btn.disabled = false;
    };
    btn.append(spinner);
    const user: IUser = {
      email: (formSignIn.querySelector('.form-signin__email') as HTMLFormElement).value,
      password: (formSignIn.querySelector('.form-signin__password') as HTMLFormElement).value,
    };
    signIn(user, finallyCallback);
  });

  const formRegistration = modal.querySelector('#form-registration') as HTMLFormElement;
  formRegistration.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = formRegistration.querySelector('.btn') as HTMLFormElement;

    btn.disabled = true;
    const spinner = renderSpinner('white', 16);
    const finallyCallback = () => {
      spinner.remove();
      btn.disabled = false;
    };
    btn.append(spinner);
    const user: IUser = {
      name: (formRegistration.querySelector('.form-registration__name') as HTMLFormElement).value,
      email: (formRegistration.querySelector('.form-registration__email') as HTMLFormElement).value,
      password: (formRegistration.querySelector('.form-registration__password') as HTMLFormElement).value,
    };
    signUp(user, finallyCallback);
  });
}
