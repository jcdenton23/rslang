import { clearAndGetElement } from '../../utils';
import { IGamesStartPage } from '../../components/interfaces';
import { IRouter } from '../../router/types';

const backBtnListener = (elem: HTMLElement, renderGamesStartPage: IGamesStartPage, router: IRouter) => {
  const backBtn = elem.querySelector('.back-games-btn') as HTMLButtonElement;
  backBtn.addEventListener('click', () => {
    const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
    gamesContent.append(renderGamesStartPage(router));
  });
};

export default backBtnListener;
