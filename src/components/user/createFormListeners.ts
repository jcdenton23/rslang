import { IUser } from '../interfaces';
import renderSpinner from '../Spinner/renderSpinner';
import createUser from './createUser';
import signIn from './signIn';

export default function createFormListeners(modal: HTMLDivElement) {
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
      email: (formSignIn.querySelector('#exampleInputEmailSignIn') as HTMLFormElement).value,
      password: (formSignIn.querySelector('#exampleInputPasswordSignIn') as HTMLFormElement).value,
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
      name: (formRegistration.querySelector('#exampleInputNameReg') as HTMLFormElement).value,
      email: (formRegistration.querySelector('#exampleInputEmailReg') as HTMLFormElement).value,
      password: (formRegistration.querySelector('#exampleInputPasswordReg') as HTMLFormElement).value,
    };
    createUser(user, finallyCallback);
  });
}
