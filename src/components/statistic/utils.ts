import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import statisticsStore from '../../store/statisticsStore';
import userWordsStore from '../../store/userWordsStore';
import { LearnedIn, Method } from '../enum';
import { IAudioChallengeStore, ISprintStore, IStatistics } from '../interfaces';
import getAllUserWords from '../words/getUserWords';

export function clearStatistics() {
  const clearObjectStatistics: IStatistics = {
    learnedWords: 0,
    optional: {
      currentDate: new Date().toISOString().slice(0, 10),
      sprint: {
        maxInRow: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      },
      audioChallenge: {
        maxInRow: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
      },
    },
  };

  Object.entries(clearObjectStatistics).forEach(([key, value]) => {
    statisticsStore[key] = value;
  });
}

export default async function getStatistics() {
  const url = `${BASE_LINK}users/${authStore.userId}/statistics`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });
  const response = await fetchWithErrorHandling<IStatistics>({
    url,
    options: { headers },
    showNotification: false,
  });

  if (response) {
    Object.entries(response).forEach(([key, value]) => {
      if (key !== 'id') {
        statisticsStore[key] = value;
      }
    });
  }
}

export async function setStatistics() {
  const url = `${BASE_LINK}users/${authStore.userId}/statistics`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  if (statisticsStore.optional.currentDate !== new Date().toISOString().slice(0, 10)) {
    clearStatistics();
  }

  await getAllUserWords();
  statisticsStore.learnedWords = userWordsStore.words!.filter(
    (word) => word.optional.firstLearned === new Date().toISOString().slice(0, 10),
  ).length;

  await fetchWithErrorHandling<IStatistics>({
    url,
    options: { headers, method: Method.PUT, body: JSON.stringify(statisticsStore) },
    showNotification: false,
  });
}

export async function getGameStatistics(
  gameType: LearnedIn,
  { correctAnswers, wrongAnswers, maxInRow }: ISprintStore | IAudioChallengeStore,
) {
  await getAllUserWords();

  if (gameType === LearnedIn.sprint) {
    const { sprint } = statisticsStore.optional;
    sprint.correctAnswers += correctAnswers;
    sprint.wrongAnswers += wrongAnswers;
    sprint.maxInRow = sprint.maxInRow > maxInRow ? sprint.wrongAnswers : maxInRow;
  } else {
    const { audioChallenge } = statisticsStore.optional;
    audioChallenge.correctAnswers += correctAnswers;
    audioChallenge.wrongAnswers += wrongAnswers;
    audioChallenge.maxInRow = audioChallenge.maxInRow > maxInRow ? audioChallenge.maxInRow : maxInRow;
  }
  await setStatistics();
}
