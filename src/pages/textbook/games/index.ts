import { loadSprintGame, resetSprintStore } from '../../../games/sprint/utils';
import { BASE_LINK } from '../../../services/constants';
import textbookStore from '../../../store/textbookStore';
import renderSprintGame from '../../../games/sprint/renderSprintGame';
import renderSprintResult from '../../../games/sprint/renderSprintResult';
import startTimer from '../../../games/sprint/startTimer';
import sprintStore from '../../../store/sprintStore';
import { GameInitators } from '../../../components/enum';

const renderGames = () => {
  const gamesWrapper = document.createElement('div') as HTMLDivElement;
  gamesWrapper.classList.add('textbook__games');
  gamesWrapper.innerHTML = `
    <button type="button" class="btn btn-audio btn-labeled btn-outline-primary">
        <span class="btn-label">
          <i class="fas fa-volume-up"></i>
        </span>
        Audio challenge
      </button>
      <button type="button" class="btn btn-sprint btn-labeled btn-outline-primary">
        <span class="btn-label">
          <i class="fas fa-running"></i>
        </span>
        Sprint
      </button>
    `;

  const sprintBtn = gamesWrapper.querySelector('.btn-sprint') as HTMLButtonElement;
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

  return gamesWrapper;
};

export default renderGames;
