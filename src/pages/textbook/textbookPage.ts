import renderCards from './cards';
import renderGames from './games';
import renderGroupPagination from './groupPagination';
import renderPagination from './pagination';
import textbookStore from '../../store/textbookStore';
import { checkIsPageLearned } from './groupPagination/utils';
import { IRouter } from '../../router/types';

const getTextbookElement = (router: IRouter): HTMLDivElement => {
  const elem = document.createElement('div');
  elem.classList.add('textbook-page');
  elem.innerHTML = `
  <section class="textbook">
  <div class="container">
      <div class="textbook__wrapper">
      </div>
  </div>
  </section>
  `;
  const textbookWrapper = elem.querySelector('.textbook__wrapper') as HTMLDivElement;
  textbookWrapper.appendChild(renderGames(router));
  textbookWrapper.appendChild(renderGroupPagination());
  textbookWrapper.appendChild(renderPagination());
  const { cardClassName } = textbookStore;
  textbookWrapper.appendChild(renderCards({ cardClassName, isHardCard: false, checkIsPageLearned }));
  return elem;
};

export default getTextbookElement;
