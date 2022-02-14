import { GameInitators, Games } from '../../components/enum';
import { BASE_LINK } from '../../services/constants';
import sprintStore from '../../store/sprintStore';
import renderSprintResult from '../sprint/results/renderSprintResult';
import renderSprintGame from '../sprint/sprintGame/renderSprintGame';
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
    }
  });
};

export default selectLevelListener;
