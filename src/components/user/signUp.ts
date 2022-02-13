import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import BASE_LINK from '../../services/settings';
import { Method } from '../enum';
import { IUser } from '../interfaces';
import signIn from './signIn';

export default async function signUp(user: IUser, finallyCallback: () => void) {
  const url = `${BASE_LINK}users`;
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const request = await fetchWithErrorHandling(url, finallyCallback, {
    method: Method.POST,
    body: JSON.stringify(user),
    headers,
  });

  if (request) {
    signIn(user, finallyCallback);
  }
}
