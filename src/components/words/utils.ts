import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import userWordsStore from '../../store/userWordsStore';
import { Difficulty, Method } from '../enum';
import { IWordInfo, IRequests, IResponseWordInfo } from '../interfaces';

const getHeaderForUser = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

export async function getAllUserWords() {
  const url = `${BASE_LINK}users/${authStore.userId}/words`;

  const headers = getHeaderForUser();

  const request = {
    url,
    options: { headers },
    showNotification: false,
  };

  const response = (await fetchWithErrorHandling(request)) as IResponseWordInfo[];

  userWordsStore.words = response || [];
}

export async function getWordInfo(wordId: string) {
  const url = `${BASE_LINK}users/${authStore.userId}/words/${wordId}`;
  const headers = getHeaderForUser();

  const request: IRequests = {
    url,
    options: { headers },
    showNotification: false,
  };

  return fetchWithErrorHandling(request);
}

function createBodyWord({ difficulty = Difficulty.normal, learned = false }) {
  return {
    difficulty,
    optional: { streak: 0, correctAnswer: 0, wrongAnswer: 0, learned },
  };
}

export function updateBody(isCorrect: boolean, body?: IWordInfo) {
  const GOOD_HARD_SCORE = 5;
  const GOOD_NORMAL_SCORE = 3;

  const currentBody = body || createBodyWord({});

  if (isCorrect) {
    currentBody.optional.streak += 1;
    currentBody.optional.correctAnswer += 1;
  } else {
    currentBody.optional.streak = 0;
    currentBody.optional.wrongAnswer += 1;
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

export async function fetchWord(wordId: string, method: string, { difficulty, optional }: IWordInfo) {
  const url = `${BASE_LINK}users/${authStore.userId}/words/${wordId}`;
  const headers = getHeaderForUser();

  const request = {
    url,
    options: {
      method,
      body: JSON.stringify({ difficulty, optional }),
      headers,
    },
    showNotification: true,
  };

  await fetchWithErrorHandling(request);
}

export async function toggleDifficulty(wordId: string) {
  const body = (await getWordInfo(wordId)) as IResponseWordInfo;
  const method = body ? Method.PUT : Method.POST;

  if (body) {
    body.difficulty = body.difficulty === Difficulty.normal ? Difficulty.hard : Difficulty.normal;
    fetchWord(wordId, method, body);
  } else {
    const hardBody = createBodyWord({ difficulty: Difficulty.hard });

    fetchWord(wordId, method, hardBody);
  }
}

export async function toggleLearned(wordId: string) {
  const body = (await getWordInfo(wordId)) as IResponseWordInfo;
  const method = body ? Method.PUT : Method.POST;

  if (body) {
    if (body.optional.learned) {
      body.optional.streak = 0;
    } else {
      body.difficulty = Difficulty.normal;
    }

    body.optional.learned = !body.optional.learned;

    fetchWord(wordId, method, body);
  } else {
    const newBody = createBodyWord({ learned: true });

    fetchWord(wordId, method, newBody);
  }
}

export async function updateWord(wordId: string, isCorrect: boolean) {
  const wordInfo = (await getWordInfo(wordId)) as IResponseWordInfo;

  if (wordInfo) {
    const { difficulty, optional } = wordInfo;
    const body = updateBody(isCorrect, { difficulty, optional });
    fetchWord(wordId, Method.PUT, body);
  } else {
    const body = updateBody(isCorrect);
    fetchWord(wordId, Method.POST, body);
  }
}
