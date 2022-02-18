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

  const response = await fetchWithErrorHandling<IResponseWordInfo[]>(request);

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

  return fetchWithErrorHandling<IResponseWordInfo>(request);
}

function createWordInfo({ difficulty = Difficulty.normal, learned = false }) {
  return {
    difficulty,
    optional: { streak: 0, correctAnswer: 0, wrongAnswer: 0, learned },
  };
}

export function updateWordInfo(isCorrect: boolean, wordInfo?: IWordInfo) {
  const GOOD_HARD_SCORE = 5;
  const GOOD_NORMAL_SCORE = 3;

  const currentWord = wordInfo || createWordInfo({});

  if (isCorrect) {
    currentWord.optional.streak += 1;
    currentWord.optional.correctAnswer += 1;
  } else {
    currentWord.optional.streak = 0;
    currentWord.optional.wrongAnswer += 1;
    currentWord.optional.learned = false;
  }

  const countWins = currentWord.optional.streak;
  const { difficulty } = currentWord;
  const canHard = countWins >= GOOD_HARD_SCORE && difficulty === Difficulty.hard;
  const canNormal = countWins >= GOOD_NORMAL_SCORE && difficulty === Difficulty.normal;

  if (canHard || canNormal) {
    currentWord.optional.learned = true;
    currentWord.difficulty = Difficulty.normal;
  }
  return currentWord;
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

  await fetchWithErrorHandling<IResponseWordInfo>(request);
}

export async function toggleDifficulty(wordId: string) {
  const wordInfo = await getWordInfo(wordId);

  if (wordInfo) {
    wordInfo.difficulty = wordInfo.difficulty === Difficulty.normal ? Difficulty.hard : Difficulty.normal;
    await fetchWord(wordId, Method.PUT, wordInfo);
  } else {
    const hardWord = createWordInfo({ difficulty: Difficulty.hard });

    await fetchWord(wordId, Method.POST, hardWord);
  }
}

export async function toggleLearned(wordId: string) {
  const wordInfo = await getWordInfo(wordId);
  const method = wordInfo ? Method.PUT : Method.POST;

  if (wordInfo) {
    if (wordInfo.optional.learned) {
      wordInfo.optional.streak = 0;
    } else {
      wordInfo.difficulty = Difficulty.normal;
    }

    wordInfo.optional.learned = !wordInfo.optional.learned;

    await fetchWord(wordId, method, wordInfo);
  } else {
    const newWordInfo = createWordInfo({ learned: true });

    await fetchWord(wordId, method, newWordInfo);
  }
}

export async function updateWord(wordId: string, isCorrect: boolean) {
  const wordInfo = await getWordInfo(wordId);

  if (wordInfo) {
    const { difficulty, optional } = wordInfo;
    const currentWordInfo = updateWordInfo(isCorrect, { difficulty, optional });
    await fetchWord(wordId, Method.PUT, currentWordInfo);
  } else {
    const currentWordInfo = updateWordInfo(isCorrect);
    await fetchWord(wordId, Method.POST, currentWordInfo);
  }
}
