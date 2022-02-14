import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import { Difficulty, Method } from '../enum';
import { IBodyWord, IResponseBodyWord } from '../interfaces';

export async function getWordInfo(token: string) {
  const url = `${BASE_LINK}users/${authStore.userId}/words/${token}`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const res = await fetch(url, { headers });
  if (res.ok) {
    return res.json();
  }
  return false;
}

function createBodyWord(hard = false) {
  return {
    difficulty: hard ? Difficulty.hard : Difficulty.normal,
    optional: { streak: 0, wins: 0, losses: 0, learned: false },
  };
}

export function updateBody(win: boolean, body?: IBodyWord) {
  const GOOD_HARD_SCORE = 5;
  const GOOD_NORMAL_SCORE = 3;

  const currentBody = body || createBodyWord();

  if (win) {
    currentBody.optional.streak += 1;
    currentBody.optional.wins += 1;
  } else {
    currentBody.optional.streak = 0;
    currentBody.optional.losses += 1;
    currentBody.optional.learned = false;
  }

  const countWins = currentBody.optional.streak;
  const { difficulty } = currentBody;
  const canHard = countWins >= GOOD_HARD_SCORE && difficulty === Difficulty.hard;
  const canNormal = countWins >= GOOD_NORMAL_SCORE && difficulty === Difficulty.normal;

  if (canHard || canNormal) {
    currentBody.optional.learned = true;
    currentBody.difficulty = Difficulty.normal;
  }
  return currentBody;
}

export async function fetchWord(token: string, method: string, body: IBodyWord) {
  const url = `${BASE_LINK}users/${authStore.userId}/words/${token}`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const request = await fetchWithErrorHandling(url, () => {}, {
    method,
    body: JSON.stringify(body),
    headers,
  });
  console.log(request);
}

export async function toggleDifficulty(token = '5e9f5ee35eb9e72bc21af410') {
  const body = (await getWordInfo(token)) as IResponseBodyWord;
  const method = body ? Method.PUT : Method.POST;
  if (body) {
    body.difficulty = body.difficulty === Difficulty.normal ? Difficulty.hard : Difficulty.normal;
    const { difficulty, optional } = body;
    fetchWord(token, method, { difficulty, optional });
  } else {
    const isHard = true;
    const hardBody = createBodyWord(isHard);
    fetchWord(token, method, hardBody);
  }
}

export async function toggleLearned(token = '5e9f5ee35eb9e72bc21af410') {
  const body = (await getWordInfo(token)) as IResponseBodyWord;
  const method = body ? Method.PUT : Method.POST;
  if (body) {
    if (body.optional.learned) {
      body.optional.streak = 0;
    }

    body.optional.learned = !body.optional.learned;

    const { difficulty, optional } = body;
    fetchWord(token, method, { difficulty, optional });
  } else {
    const newBody = createBodyWord();
    newBody.optional.learned = !newBody.optional.learned;
    fetchWord(token, method, body);
  }
}
