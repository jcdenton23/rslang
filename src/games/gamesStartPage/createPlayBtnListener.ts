import { clearAndGetElement } from '../../utils';
import renderSelectLevel from '../gamesSelectLevel/renderSelectLevel';
import { IGamesStartPage } from '../../components/interfaces';
import { Games } from '../../components/enum';
import { IRouter } from '../../router/types';

const createPlayBtnListener = (elem: HTMLElement, renderGamesStartPage: IGamesStartPage, router: IRouter) => {
  const playBtnHandler = (title: Games) => {
    const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
    gamesContent.append(renderSelectLevel(title, renderGamesStartPage, router));
  };

  const sprintPlayBtn = elem.querySelector('.sprint-play-btn') as HTMLButtonElement;
  const audioPlayBtn = elem.querySelector('.audio-play-btn') as HTMLButtonElement;

  sprintPlayBtn.addEventListener('click', () => {
    playBtnHandler(Games.sprint);
  });

  audioPlayBtn.addEventListener('click', () => {
    playBtnHandler(Games.audio);
  });
};

export default createPlayBtnListener;
