import { GameInitators } from '../../../components/enum';
import renderSprintResult from '../../../games/sprint/results/renderSprintResult';
import renderSprintGame from '../../../games/sprint/sprintGame/renderSprintGame';
import startTimer from '../../../games/sprint/startTimer';
import { loadSprintGame, resetSprintStore } from '../../../games/sprint/utils';
import { BASE_LINK } from '../../../services/constants';
import sprintStore from '../../../store/sprintStore';
import textbookStore from '../../../store/textbookStore';

const sprintBtnListener = (elem: HTMLElement) => {
  const sprintBtn = elem.querySelector('.btn-sprint') as HTMLButtonElement;
  sprintBtn.addEventListener('click', () => {
    sprintStore.gameInitiator = GameInitators.textbook;
    resetSprintStore();

    const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
    textbookWrapper.innerHTML = '';
    const gamesContent = document.createElement('div') as HTMLDivElement;
    gamesContent.classList.add('games__content');
    textbookWrapper.append(gamesContent);

    const { textbookPage, textbookGroup } = textbookStore;
    sprintStore.currentPage = textbookPage;
    const url = `${BASE_LINK}words?group=${textbookGroup}&page=${textbookPage}`;

    const options = {
      url,
      renderSprintGame,
      startTimer,
      renderSprintResult,
    };

    loadSprintGame(options);
  });
};

export default sprintBtnListener;
