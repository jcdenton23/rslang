import { GameInitators } from '../../../components/enum';
import { ISprintResult, IStartTimer } from '../../../components/interfaces';
import { BASE_LINK } from '../../../services/constants';
import sprintStore from '../../../store/sprintStore';
import textbookStore from '../../../store/textbookStore';
import renderSprintGame from '../sprintGame/renderSprintGame';
import { loadSprintGame, resetSprintStore } from '../utils';

const tryAgainBtnListener = (elem: HTMLElement, renderSprintResult: ISprintResult, startTimer: IStartTimer) => {
  const tryAgainBtn = elem.querySelector('.btn-again') as HTMLButtonElement;

  tryAgainBtn.addEventListener('click', async () => {
    resetSprintStore();
    if (sprintStore.gameInitiator === GameInitators.textbook) {
      sprintStore.currentPage = textbookStore.textbookPage;
      sprintStore.currentGroup = textbookStore.textbookGroup;
    }
    const { currentPage, currentGroup } = sprintStore;
    const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage}`;

    const options = {
      url,
      renderSprintGame,
      renderSprintResult,
      startTimer,
    };

    loadSprintGame(options);
  });
};

export default tryAgainBtnListener;
