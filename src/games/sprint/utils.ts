import renderSpinner from '../../components/Spinner/renderSpinner';
import createSpinnerWrapper from '../../components/Spinner/utils';
import renderTimer from '../../components/timer';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import sprintStore from '../../store/sprintStore';
import { clearAndGetElement, shuffleArray } from '../../utils';
import { IRenderSprintGame, IRequests, ISprintResult, IStartTimer, IWord } from '../../components/interfaces';
import { GameInitators, Routes } from '../../components/enum';
import { IRouter } from '../../router/types';
import authStore from '../../store/authStore';
import { getUnlearnedUserWords } from '../../components/words/utils';
import textbookStore from '../../store/textbookStore';

export const resetSprintStore = () => {
  sprintStore.score = 0;
  sprintStore.correctAnswers = 0;
  sprintStore.wrongAnswers = 0;
  sprintStore.currentInRow = 0;
  sprintStore.currentPage = 29;
  sprintStore.questionNumber = 0;
  sprintStore.maxInRow = 0;
  sprintStore.correctWords = [];
  sprintStore.wrongWords = [];
  sprintStore.needLearnWords = [];
  sprintStore.isGameFinished = false;
  clearInterval(sprintStore.timerId);
};

interface ILoadSprintGame {
  url: string;
  renderSprintGame: IRenderSprintGame;
  startTimer: IStartTimer;
  renderSprintResult: ISprintResult;
  router: IRouter;
}

export const loadSprintGame = async (props: ILoadSprintGame) => {
  const { url, renderSprintGame, startTimer, renderSprintResult, router } = props;

  const main = document.getElementById('main') as HTMLDivElement;
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
    if (sprintStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const { textbookGroup, textbookPage } = textbookStore;
      const aggregatedWords = await getUnlearnedUserWords(textbookPage, textbookGroup);

      const unlearned = aggregatedWords?.[0].paginatedResults;
      sprintStore.needLearnWords = res.filter(
        // eslint-disable-next-line no-underscore-dangle
        (word) => unlearned?.some((unlearnedWord) => unlearnedWord._id === word.id),
        // eslint-disable-next-line function-paren-newline
      );
    } else {
      sprintStore.needLearnWords = res;
    }
    const { needLearnWords } = sprintStore;

    sprintStore.words = shuffleArray(needLearnWords);
    sprintStore.translateWords = shuffleArray(res);

    main.prepend(renderTimer());
    startTimer(sprintStore.time, '.timer', router);

    const options = {
      word: sprintStore.words[0],
      translateWord: sprintStore.translateWords[0],
      renderSprintResult,
      startTimer,
      router,
    };
    gamesContent.append(renderSprintGame(options));
  } else {
    router.push(Routes.main);
  }
};

interface ILoadSprintNewWords {
  url: string;
  router: IRouter;
  page: number;
  group: number;
  renderSprintResult: ISprintResult;
  startTimer: IStartTimer;
}

export const loadSprintNewWords = async (props: ILoadSprintNewWords) => {
  const { url, router, page, group, renderSprintResult, startTimer } = props;
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
    if (sprintStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const aggregatedWords = await getUnlearnedUserWords(page, group);
      const unlearned = aggregatedWords?.[0].paginatedResults;
      sprintStore.needLearnWords = res.filter(
        // eslint-disable-next-line no-underscore-dangle
        (word) => unlearned?.some((unlearnedWord) => unlearnedWord._id === word.id),
        // eslint-disable-next-line function-paren-newline
      );
      if (sprintStore.needLearnWords.length === 0) {
        const timerEl = document.querySelector('.timer') as HTMLDivElement;
        timerEl.remove();
        gamesContent.append(renderSprintResult(startTimer, router));
        sprintStore.isGameFinished = true;
        return;
      }
    } else {
      sprintStore.needLearnWords = res;
    }
    const { needLearnWords } = sprintStore;
    sprintStore.words = shuffleArray(needLearnWords);
    sprintStore.translateWords = shuffleArray(res);
    sprintStore.questionNumber = 0;
  } else {
    router.push(Routes.main);
  }
};
