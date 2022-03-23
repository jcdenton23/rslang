import { IRouter } from '../../../router/types';
import audioChallengeBtnListener from './createAudioChallengeListener';
import sprintBtnListener from './createSprintBtnListener';

const renderGames = (router: IRouter) => {
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

  sprintBtnListener(gamesWrapper, router);
  audioChallengeBtnListener(gamesWrapper, router);

  return gamesWrapper;
};

export default renderGames;
