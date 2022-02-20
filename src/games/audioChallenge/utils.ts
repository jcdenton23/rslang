import { GameInitators, Routes } from '../../components/enum';
import { IrenderAudioChallengeGame, IRenderAuidoChallengeResults, IRequests, IWord } from '../../components/interfaces';
import renderSpinner from '../../components/Spinner/renderSpinner';
import createSpinnerWrapper from '../../components/Spinner/utils';
import { getUnlearnedUserWords } from '../../components/words/utils';
import { IRouter } from '../../router/types';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import audioChallengeStore from '../../store/audioChallengeStore';
import authStore from '../../store/authStore';
import textbookStore from '../../store/textbookStore';
import { clearAndGetElement, shuffleArray } from '../../utils';

export const resetAudioChallengeStore = () => {
  audioChallengeStore.correctAnswers = 0;
  audioChallengeStore.wrongAnswers = 0;
  audioChallengeStore.currentInRow = 0;
  audioChallengeStore.questionIndex = 0;
  audioChallengeStore.currentQuestionNumber = 0;
  audioChallengeStore.maxInRow = 0;
  audioChallengeStore.correctWords = [];
  audioChallengeStore.wrongWords = [];
  audioChallengeStore.needLearnWords = [];
  audioChallengeStore.isGameFinished = false;
};

interface ILoadNewAudioChalllengeWords {
  url: string;
  router: IRouter;
  page: number;
  group: number;
  renderAudioChallengeResults: IRenderAuidoChallengeResults;
  renderAudioChallengeGame: IrenderAudioChallengeGame;
}

export const loadNewAudioChallengeWords = async (props: ILoadNewAudioChalllengeWords) => {
  const { url, router, page, group, renderAudioChallengeGame, renderAudioChallengeResults } = props;

  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;

  const spinner = renderSpinner('black', 40);
  const spinnerWrapper = createSpinnerWrapper();
  spinnerWrapper.appendChild(spinner);
  gamesContent.append(spinnerWrapper);

  const finallyCallback = () => spinnerWrapper.remove();

  const request: IRequests = {
    url,
    finallyCallback,
    showNotification: true,
  };

  const res = await fetchWithErrorHandling<IWord[]>(request);

  if (res) {
    if (audioChallengeStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const aggregatedWords = await getUnlearnedUserWords(page, group);
      const unlearned = aggregatedWords?.[0].paginatedResults;
      audioChallengeStore.needLearnWords = res.filter(
        // eslint-disable-next-line no-underscore-dangle
        (word) => unlearned?.find((unlearnedWord) => unlearnedWord._id === word.id),
        // eslint-disable-next-line function-paren-newline
      );
      if (audioChallengeStore.needLearnWords.length === 0) {
        gamesContent.append(renderAudioChallengeResults(renderAudioChallengeGame, router));
        audioChallengeStore.isGameFinished = true;
        return;
      }
    } else {
      audioChallengeStore.needLearnWords = res;
    }
    const { needLearnWords } = audioChallengeStore;

    audioChallengeStore.wordForOptions = res;
    audioChallengeStore.words = shuffleArray(needLearnWords);
    audioChallengeStore.questionIndex = 0;
  } else {
    router.push(Routes.main);
  }
};

export const loadAudioChallengeGame = async (
  url: string,
  renderAudioChallengeGame: IrenderAudioChallengeGame,
  router: IRouter,
) => {
  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;

  const spinner = renderSpinner('black', 40);
  const spinnerWrapper = createSpinnerWrapper();
  spinnerWrapper.appendChild(spinner);
  gamesContent.append(spinnerWrapper);

  const finallyCallback = () => spinnerWrapper.remove();

  const request: IRequests = {
    url,
    finallyCallback,
    showNotification: true,
  };

  const res = await fetchWithErrorHandling<IWord[]>(request);

  if (res) {
    if (audioChallengeStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const { textbookGroup, textbookPage } = textbookStore;
      const aggregatedWords = await getUnlearnedUserWords(textbookPage, textbookGroup);
      const unlearned = aggregatedWords?.[0].paginatedResults;
      audioChallengeStore.needLearnWords = res.filter(
        // eslint-disable-next-line no-underscore-dangle
        (word) => unlearned?.find((unlearnedWord) => unlearnedWord._id === word.id),
        // eslint-disable-next-line function-paren-newline
      );
    } else {
      audioChallengeStore.needLearnWords = res;
    }
    const { needLearnWords, questionIndex } = audioChallengeStore;
    audioChallengeStore.wordForOptions = res;
    audioChallengeStore.words = shuffleArray(needLearnWords);
    const { words } = audioChallengeStore;
    const currentWord = words[questionIndex];

    const restWords = shuffleArray(res.filter((word) => word.id !== currentWord.id));
    const optionsWords = shuffleArray([currentWord, restWords[0], restWords[1], restWords[2]]);
    gamesContent.append(renderAudioChallengeGame(currentWord, optionsWords, router));
  } else {
    router.push(Routes.main);
  }
};

export default loadAudioChallengeGame;
