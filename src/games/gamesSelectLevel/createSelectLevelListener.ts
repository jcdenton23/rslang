import { GameInitators, Games } from '../../components/enum';
import { BASE_LINK } from '../../services/constants';
import audioChallengeStore from '../../store/audioChallengeStore';
import sprintStore from '../../store/sprintStore';
import { getRandomNum } from '../../utils';
import loadAudioGame, { resetAudioChallengeStore } from '../audioChallenge/utils';
import renderSprintResult from '../sprint/results/renderSprintResult';
import renderSprintGame from '../sprint/sprintGame/renderSprintGame';
import renderAudioChallengeGame from '../audioChallenge/audioChallengeGame/renderAudioChallengeGame';
import startTimer from '../sprint/startTimer';
import { loadSprintGame, resetSprintStore } from '../sprint/utils';

const selectLevelListener = (el: HTMLElement, gameName: string) => {
  const btnsWrapper = el.querySelector('.games__level-btns') as HTMLDivElement;
  btnsWrapper.addEventListener('click', async (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('btn')) {
      const { group } = target.dataset;

      if (gameName === Games.sprint) {
        sprintStore.gameInitiator = GameInitators.menu;
        resetSprintStore();
        sprintStore.currentGroup = Number(group) - 1;
        const { currentPage, currentGroup } = sprintStore;
        const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage}`;
        const options = {
          url,
          renderSprintGame,
          startTimer,
          renderSprintResult,
        };
        loadSprintGame(options);
      }

      if (gameName === Games.audio) {
        resetAudioChallengeStore();
        audioChallengeStore.currentGroup = Number(group) - 1;
        audioChallengeStore.currentPage = getRandomNum(0, 29);
        const { currentPage, currentGroup } = audioChallengeStore;

        const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage}`;
        loadAudioGame(url, renderAudioChallengeGame);
      }
    }
  });
};

export default selectLevelListener;
