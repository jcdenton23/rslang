import { auth } from '../constants';
import { IAuth } from '../interfaces';

export default function getLocalUser() {
  const localUser = JSON.parse(localStorage.getItem('auth')!) as IAuth;
  Object.entries(localUser).forEach((line) => {
    const key = line[0];
    const value = line[1] as string;
    auth[key] = value;
  });
  console.log(auth);
}
