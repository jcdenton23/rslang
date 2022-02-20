import { IrenderAudioChallengeGame } from '../../../components/interfaces';
import { IRouter } from '../../../router/types';
import { BASE_LINK } from '../../../services/constants';
import audioChallengeStore from '../../../store/audioChallengeStore';
import loadAudioGame, { resetAudioChallengeStore } from '../utils';

const tryAgainBtnListener = (
  elem: HTMLElement,
  renderAudioChallengeGame: IrenderAudioChallengeGame,
  router: IRouter,
) => {
  const tryAgainBtn = elem.querySelector('.btn-again') as HTMLButtonElement;
  tryAgainBtn.addEventListener('click', async () => {
    resetAudioChallengeStore();
    const { currentPage, currentGroup } = audioChallengeStore;

    const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage}`;
    loadAudioGame(url, renderAudioChallengeGame, router);
  });
};

export default tryAgainBtnListener;
