import { GameInitators, Routes } from '../../../components/enum';
import { ISprintResult, IStartTimer } from '../../../components/interfaces';
import { getUnlearnedUserWords } from '../../../components/words/utils';
import { IRouter } from '../../../router/types';
import { BASE_LINK } from '../../../services/constants';
import authStore from '../../../store/authStore';
import sprintStore from '../../../store/sprintStore';
import textbookStore from '../../../store/textbookStore';
import renderSprintGame from '../sprintGame/renderSprintGame';
import { loadSprintGame, resetSprintStore } from '../utils';

interface ITryAgainBtnListener {
  elem: HTMLElement;
  renderSprintResult: ISprintResult;
  startTimer: IStartTimer;
  router: IRouter;
}

const tryAgainBtnListener = async (props: ITryAgainBtnListener) => {
  const { elem, renderSprintResult, startTimer, router } = props;

  const tryAgainBtn = elem.querySelector('.btn-again') as HTMLButtonElement;
  tryAgainBtn.addEventListener('click', async () => {
    if (sprintStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const { textbookGroup, textbookPage } = textbookStore;
      const results = await getUnlearnedUserWords(textbookPage, textbookGroup);
      const unlearnedWords = results?.[0].paginatedResults;
      if (unlearnedWords?.length === 0) {
        router.push(Routes.textbookHandler);
        return;
      }
    }

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
      router,
    };

    loadSprintGame(options);
  });
};

export default tryAgainBtnListener;
