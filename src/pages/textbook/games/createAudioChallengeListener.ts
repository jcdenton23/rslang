import { GameInitators } from '../../../components/enum';
import renderAudioChallengeGame from '../../../games/audioChallenge/audioChallengeGame/renderAudioChallengeGame';
import loadAudioGame, { resetAudioChallengeStore } from '../../../games/audioChallenge/utils';
import { IRouter } from '../../../router/types';
import { BASE_LINK } from '../../../services/constants';
import audioChallengeStore from '../../../store/audioChallengeStore';
import textbookStore from '../../../store/textbookStore';

const audioChallengeBtnListener = (elem: HTMLElement, router: IRouter) => {
  const audioBtn = elem.querySelector('.btn-audio') as HTMLButtonElement;
  audioBtn.addEventListener('click', () => {
    audioChallengeStore.gameInitiator = GameInitators.textbook;
    resetAudioChallengeStore();

    const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
    textbookWrapper.innerHTML = '';
    const gamesContent = document.createElement('div') as HTMLDivElement;
    gamesContent.classList.add('games__content');
    textbookWrapper.append(gamesContent);

    const { textbookPage, textbookGroup } = textbookStore;
    audioChallengeStore.currentPage = textbookPage;
    audioChallengeStore.currentGroup = textbookGroup;
    const url = `${BASE_LINK}words?group=${textbookGroup}&page=${textbookPage}`;

    loadAudioGame(url, renderAudioChallengeGame, router);
  });
};

export default audioChallengeBtnListener;
