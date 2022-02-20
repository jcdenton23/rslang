import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import statisticsStore from '../../store/statisticsStore';
import userWordsStore from '../../store/userWordsStore';
import { LearnedIn, Method } from '../enum';
import { IAudioChallengeStore, ISprintStore, IStatistics } from '../interfaces';
import { getHeaderForUser } from '../utils';
import getAllUserWords from '../words/getUserWords';

export default async function getStatistics() {
  const url = `${BASE_LINK}users/${authStore.userId}/statistics`;
  const headers = getHeaderForUser();
  const response = await fetchWithErrorHandling<IStatistics>({
    url,
    options: { headers },
    showNotification: false,
  });

  if (response) {
    Object.entries(response).forEach((line) => {
      const [key, value] = line;
      statisticsStore[key] = value;
    });
  }
}

export async function setStatistics() {
  const url = `${BASE_LINK}users/${authStore.userId}/statistics`;
  const headers = getHeaderForUser();
  await getAllUserWords();
  statisticsStore.learnedWords = userWordsStore.words!.filter(
    (word) => word.optional.firstLearned === new Date().toISOString().slice(0, 10),
  ).length;
  console.log(statisticsStore.learnedWords);

  await fetchWithErrorHandling<IStatistics>({
    url,
    options: { headers, method: Method.PUT, body: JSON.stringify(statisticsStore) },
    showNotification: false,
  });
}

export async function getGameStatistics(
  gameType: LearnedIn,
  { correctAnswers, wrongAnswers, maxInRow, correctWords, wrongWords }: ISprintStore | IAudioChallengeStore,
) {
  await getAllUserWords();
  const words = [...correctWords, ...wrongWords];
  const currentUserWord = userWordsStore.words?.filter((userWord) => words.find((word) => word.id === userWord.wordId));
  const countNewWords = currentUserWord?.filter(
    (word) => word.optional.firstLearned === new Date().toISOString().slice(0, 10),
  ).length;

  if (gameType === LearnedIn.sprint) {
    const { sprint } = statisticsStore.optional;
    sprint.correctAnswers += correctAnswers;
    sprint.wrongAnswers += wrongAnswers;
    sprint.maxInRow = sprint.maxInRow > maxInRow ? sprint.wrongAnswers : maxInRow;
    sprint.newWords = countNewWords!;
  } else {
    const { audioChallenge } = statisticsStore.optional;
    audioChallenge.correctAnswers += correctAnswers;
    audioChallenge.wrongAnswers += wrongAnswers;
    audioChallenge.maxInRow = audioChallenge.maxInRow > maxInRow ? audioChallenge.maxInRow : maxInRow;
    audioChallenge.newWords = countNewWords!;
  }
  console.log(statisticsStore);
  await setStatistics();
}

// method: 'PUT', body: JSON.stringify(statisticsStore)

// export interface IGamesResult {
//   newWords: number;
//   maxInRow: number;
//   correctAnswers: number;
//   wrongAnswers: number;
// }

// export interface IStatistics {
//   learnedWords: number;
//   optional: {
//     currentDate: string;
//     sprint: IGamesResult;
//     audioChallenge: IGamesResult;
//   };
// }

// (new Date()).toISOString().slice(0,10)

// export function updateWordInfo(isCorrect: boolean, wordInfo?: IWordInfo) {
//   const GOOD_HARD_SCORE = 5;
//   const GOOD_NORMAL_SCORE = 3;

//   const currentWord = wordInfo || createWordInfo({});

//   if (isCorrect) {
//     currentWord.optional.streak += 1;
//     currentWord.optional.correctAnswer += 1;
//   } else {
//     currentWord.optional.streak = 0;
//     currentWord.optional.wrongAnswer += 1;
//     currentWord.optional.learned = false;
//   }

//   const countWins = currentWord.optional.streak;
//   const { difficulty } = currentWord;
//   const canHard = countWins >= GOOD_HARD_SCORE && difficulty === Difficulty.hard;
//   const canNormal = countWins >= GOOD_NORMAL_SCORE && difficulty === Difficulty.normal;

//   if (canHard || canNormal) {
//     currentWord.optional.learned = true;
//     currentWord.difficulty = Difficulty.normal;
//   }
//   return currentWord;
// }
