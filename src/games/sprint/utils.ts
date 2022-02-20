import renderSpinner from '../../components/Spinner/renderSpinner';
import createSpinnerWrapper from '../../components/Spinner/utils';
import renderTimer from '../../components/timer';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import sprintStore from '../../store/sprintStore';
import { clearAndGetElement, shuffleArray } from '../../utils';
import { IRenderSprintGame, IRequests, ISprintResult, IStartTimer, IWord } from '../../components/interfaces';
import { Routes } from '../../components/enum';
import { IRouter } from '../../router/types';

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
    sprintStore.words = shuffleArray(res);
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

export const loadSprintNewWords = async (url: string, router: IRouter) => {
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
    sprintStore.words = shuffleArray(res);
    sprintStore.translateWords = shuffleArray(res);
    sprintStore.questionNumber = 0;
  } else {
    router.push(Routes.main);
  }
};
