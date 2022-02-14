import { clearAndGetElement } from '../../utils';
import { IGamesStartPage } from '../../components/interfaces';

const backBtnListener = (elem: HTMLElement, renderGamesStartPage: IGamesStartPage) => {
  const backBtn = elem.querySelector('.back-games-btn') as HTMLButtonElement;
  backBtn.addEventListener('click', () => {
    const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
    gamesContent.append(renderGamesStartPage());
  });
};

export default backBtnListener;
