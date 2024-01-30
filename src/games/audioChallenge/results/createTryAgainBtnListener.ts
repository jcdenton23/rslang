import { GameInitators, Routes } from '../../../components/enum';
import { IrenderAudioChallengeGame } from '../../../components/interfaces';
import { getUnlearnedUserWords } from '../../../components/words/utils';
import { IRouter } from '../../../router/types';
import { BASE_LINK } from '../../../services/constants';
import audioChallengeStore from '../../../store/audioChallengeStore';
import authStore from '../../../store/authStore';
import textbookStore from '../../../store/textbookStore';
import loadAudioGame, { resetAudioChallengeStore } from '../utils';

const tryAgainBtnListener = (
  elem: HTMLElement,
  renderAudioChallengeGame: IrenderAudioChallengeGame,
  router: IRouter,
) => {
  const tryAgainBtn = elem.querySelector('.btn-again') as HTMLButtonElement;
  tryAgainBtn.addEventListener('click', async () => {
    if (audioChallengeStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const { textbookGroup, textbookPage } = textbookStore;
      const results = await getUnlearnedUserWords(textbookPage, textbookGroup);
      const unlearnedWords = results?.[0].paginatedResults;
      if (unlearnedWords?.length === 0) {
        router.push(Routes.textbookHandler);
        return;
      }
    }
    resetAudioChallengeStore();

    const { currentPage, currentGroup } = audioChallengeStore;

    let url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage}`;
    if (audioChallengeStore.gameInitiator === GameInitators.textbook && authStore.name) {
      const { textbookGroup, textbookPage } = textbookStore;
      url = `${BASE_LINK}words?group=${textbookGroup}&page=${textbookPage}`;
    }
    loadAudioGame(url, renderAudioChallengeGame, router);
  });
};

export default tryAgainBtnListener;
