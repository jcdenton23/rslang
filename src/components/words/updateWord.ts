import { Method } from '../enum';
import { IResponseBodyWord } from '../interfaces';
import { fetchWord, getWordInfo, updateBody } from './utils';

export default async function updateWord(token: string, win: boolean) {
  const bodyWord = (await getWordInfo(token)) as IResponseBodyWord;

  const method = bodyWord ? Method.PUT : Method.POST;

  if (bodyWord) {
    const { difficulty, optional } = bodyWord;
    const body = updateBody(win, { difficulty, optional });
    fetchWord(token, method, body);
  } else {
    const body = updateBody(win);
    fetchWord(token, method, body);
  }
}
