import { IRouter } from '../../router/types';
import createPlayBtnListener from './createPlayBtnListener';

const renderGamesStartPage = (router: IRouter): HTMLDivElement => {
  const elem = document.createElement('div');
  elem.classList.add('games__wrapper');
  elem.innerHTML = `
      <div class="games__item card">
      <div class="games__item-icon">
          <i class="fas fa-running"></i>
      </div>
      <h3 class="title title--fz20">Sprint</h3>
      <p>Sprint is a game where you have just 60 seconds to answer as many questions as you can.
       You get 20 points for a correct answer. Test your knowledge of English word!</p>
      <button type="button" class="btn btn-primary sprint-play-btn">Play</button>
    </div>
    <div class="games__item card">
      <div class="games__item-icon">
          <i class="fas fa-volume-up"></i>
      </div>
      <h3 class="title title--fz20">Audio challenge</h3>
      <p>Audio challenge is a fun, educational listening game for people of all ages to test their
       skills in correctly identifying english words.  In this game you can improve your listening skills.</p>
      <button type="button" class="btn btn-primary audio-play-btn">Play</button>
    </div>
      `;

  createPlayBtnListener(elem, renderGamesStartPage, router);
  return elem;
};

export default renderGamesStartPage;
