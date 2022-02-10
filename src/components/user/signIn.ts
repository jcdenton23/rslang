import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import BASE_LINK from '../../services/settings';
import { auth, modals } from '../constants';
import { Method } from '../enum';
import renderHeader from '../header';
import { IAuth, IUser } from '../interfaces';
import createLoginListeners from './createLoginListeners';

function clearForm() {
  document.querySelectorAll('#login-modal .form-control')?.forEach((input) => {
    const currentInput = input as HTMLFormElement;
    currentInput.value = '';
  });
}

export default async function signIn(user: IUser, finallyCallback: () => void) {
  const url = `${BASE_LINK}signin`;
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const request: IAuth = await fetchWithErrorHandling(url, finallyCallback, {
    method: Method.POST,
    body: JSON.stringify(user),
    headers,
  });

  if (request) {
    modals[0].hide();
    auth.message = request.message;
    auth.token = request.token;
    auth.refreshToken = request.refreshToken;
    auth.userId = request.userId;
    auth.name = request.name;
    localStorage.setItem('auth', JSON.stringify(auth));
    document.querySelector('.header')?.remove();
    renderHeader();
    createLoginListeners();
    clearForm();
  }
}
