import renderSpinner from '../../components/Spinner/renderSpinner';
import createSpinnerWrapper from '../../components/Spinner/utils';
import renderTimer from '../../components/timer';
import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import sprintStore from '../../store/sprintStore';
import { clearAndGetElement, shuffleArray } from '../../utils';
import { IRenderSprintGame, ISprintResult, IStartTimer } from '../../components/interfaces';

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
}

export const loadSprintGame = async (props: ILoadSprintGame) => {
  const { url, renderSprintGame, startTimer, renderSprintResult } = props;

  const main = document.getElementById('main') as HTMLDivElement;
  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;

  const spinner = renderSpinner('black', 40);
  const spinnerWrapper = createSpinnerWrapper();
  spinnerWrapper.appendChild(spinner);
  gamesContent.append(spinnerWrapper);

  const finallyCallback = () => spinnerWrapper.remove();
  const res = await fetchWithErrorHandling(url, finallyCallback);

  if (res) {
    sprintStore.words = shuffleArray(res);
    sprintStore.translateWords = shuffleArray(res);
    main.prepend(renderTimer());
    startTimer(sprintStore.time, '.timer');
    gamesContent.append(
      renderSprintGame(sprintStore.words[0], sprintStore.translateWords[0], renderSprintResult, startTimer),
    );
  } else {
    addMainContent(getMainPageElement());
  }
};

export const loadSprintNewWords = async (url: string) => {
  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;

  const spinner = renderSpinner('black', 40);
  const spinnerWrapper = createSpinnerWrapper();
  spinnerWrapper.appendChild(spinner);
  gamesContent.append(spinnerWrapper);

  const finallyCallback = () => spinnerWrapper.remove();
  const res = await fetchWithErrorHandling(url, finallyCallback);

  if (res) {
    sprintStore.words = shuffleArray(res);
    sprintStore.translateWords = shuffleArray(res);
    sprintStore.questionNumber = 0;
  } else {
    addMainContent(getMainPageElement());
  }
};
