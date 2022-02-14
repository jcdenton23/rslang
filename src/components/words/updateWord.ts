import { Method } from '../enum';
import { IResponseBodyWord } from '../interfaces';
import { fetchWord, getWordInfo, updateBody } from './utils';

export default async function updateWord(token = '5e9f5ee35eb9e72bc21af410', win = true) {
  const bodyWord = (await getWordInfo(token)) as IResponseBodyWord;

  const method = bodyWord ? Method.PUT : Method.POST;

  if (bodyWord) {
    const { difficulty, optional } = bodyWord;
    const body = updateBody(win, { difficulty, optional });
    console.log(body);
    fetchWord(token, method, body);
  } else {
    const body = updateBody(win);
    fetchWord(token, method, body);
  }
}
