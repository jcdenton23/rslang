import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import { Method } from '../enum';
import { IResponseBodyWord } from '../interfaces';
import { getWordInfo, updateBody } from './utils';

export default async function updateWord(win = true) {
  const token = '5e9f5ee35eb9e72bc21af4a8';

  const url = `${BASE_LINK}users/${authStore.userId}/words/${token}`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const bodyWord = (await getWordInfo(token)) as IResponseBodyWord;

  if (bodyWord) {
    const { difficulty, optional } = bodyWord;
    const body = updateBody(win, { difficulty, optional });
    console.log(body);

    const request = await fetchWithErrorHandling(url, () => {}, {
      method: Method.PUT,
      body: JSON.stringify(body),
      headers,
    });

    console.log(request);
  } else {
    const request = await fetchWithErrorHandling(url, () => {}, {
      method: Method.POST,
      body: JSON.stringify(updateBody(win)),
      headers,
    });

    console.log(request);
  }

  // const request = await fetchWithErrorHandling(
  //   url,
  //   () => {
  //     console.log('lol');
  //   },
  //   {
  //     method: Method.PUT,
  //     body: JSON.stringify(body),
  //     headers,
  //   },
  // );

  // console.log(request);
}

// curl -X POST "https://ts-rss-learnwords.herokuapp.com/users/6202f81dfca7c70016cc69e1/words/5e9f5ee35eb9e72bc21af4ab"
// -H "accept: application/json"
// eslint-disable-next-line max-len
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDJmODFkZmNhN2M3MDAxNmNjNjllMSIsImlhdCI6MTY0NDc2NDA3OSwiZXhwIjoxNjQ0Nzc4NDc5fQ.cSJdwc94RALwOh3NbTDWLbwuHpoohSoisGlgNVTupg4"
// -H "Content-Type: application/json"
// -d "{\"difficulty\":\"string\",\"optional\":{}}"

// /users/{id}/words/{wordId}

// export async function signIn(user: IUser, finallyCallback: () => void) {
//   const url = `${BASE_LINK}signin`;
//   const headers = new Headers({ 'Content-Type': 'application/json' });
//   const request: IAuth = await fetchWithErrorHandling(url, finallyCallback, {
//     method: Method.POST,
//     body: JSON.stringify(user),
//     headers,
//   });

//   if (request) {
//     modalStore.modal?.hide();
//     authStore.message = request.message;
//     authStore.token = request.token;
//     authStore.refreshToken = request.refreshToken;
//     authStore.userId = request.userId;
//     authStore.name = request.name;
//     localStorage.setItem('auth', JSON.stringify(authStore));
//     document.querySelector('.header')?.remove();
//     renderHeader();
//     createLoginListeners();
//     clearForm();
//   }
// }

// {
//   "difficulty": "string",
//   "optional": {}
// }

// {streak,total wins,total losses,difficulty,explorations}
