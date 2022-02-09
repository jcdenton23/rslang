import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import BASE_LINK from '../../services/settings';
import { auth, modals } from '../constants';
import { Method } from '../enum';
import { IAuth, IUser } from '../interfaces';

export default async function signIn(user: IUser) {
  const url = `${BASE_LINK}signin`;
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const request: IAuth = await fetchWithErrorHandling(url, () => {}, {
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
  }

  console.log(auth);
}
