import { clearAndGetElement } from '../utils';
import sprintStore from '../store/sprintStore';
import renderSprintGame from './sprint/renderSprintGame';
import { loadSprintGame, resetSprintStore } from './sprint/utils';
import { GameInitators, Games } from '../components/enum';
import { BASE_LINK } from '../services/constants';
import { IGamesStartPage } from '../components/interfaces';
import renderSprintResult from './sprint/renderSprintResult';
import startTimer from './sprint/startTimer';

const renderSelectLevel = (levelTitle: string, renderGamesStartPage: IGamesStartPage) => {
  const elem = document.createElement('div');
  elem.classList.add('games__level');
  elem.innerHTML = `
    <h3 class="title title--fz48">${levelTitle}</h3>
    <h3 class="title title--fz36">Select the level</h3>
    <div class="games__level-btns">
      <button type="button" class="btn btn-primary btn-lg" data-group="1">1</button>
      <button type="button" class="btn btn-info btn-lg" data-group="2">2</button>
      <button type="button" class="btn btn-warning btn-lg" data-group="3">3</button>
      <button type="button" class="btn btn-success btn-lg" data-group="4">4</button>
      <button type="button" class="btn btn-danger btn-lg" data-group="5">5</button>
      <button type="button" class="btn btn-secondary btn-lg" data-group="6">6</button>
    </div>
        <button type="button" class="btn btn-primary back-games-btn">Back</button>
      `;

  const backBtn = elem.querySelector('.back-games-btn') as HTMLButtonElement;
  backBtn.addEventListener('click', () => {
    const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
    gamesContent.append(renderGamesStartPage());
  });

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

  selectLevelListener(elem, levelTitle);

  return elem;
};

export default renderSelectLevel;
