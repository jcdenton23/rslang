import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import BASE_LINK from '../../services/settings';
import { Method } from '../enum';
import { IUser } from '../interfaces';
import { signIn } from './signIn';

export default async function createUser(user: IUser) {
  const url = `${BASE_LINK}users`;
  const headers = new Headers({ 'Content-Type': 'application/json' });

  const request = await fetchWithErrorHandling(url, () => console.log('lol'), {
    method: Method.POST,
    body: JSON.stringify(user),
    headers,
  });

  if (request) {
    signIn(user);
  }
  console.log(request);
}

// const createUser = async user => {
//   const rawResponse = await fetch('https://<your-app-name>.herokuapp.com/users', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   });
//   const content = await rawResponse.json();

//   console.log(content);
// };
// -------------------------------------------------------------------
// Console: {
// id: "5ec993df4ca9d600178740ae",
// email: "hello@user.com"
// }
