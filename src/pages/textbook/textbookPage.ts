import renderCards from './cards';
import renderGames from './games';
import renderGroupPagination from './groupPagination';
import renderPagination from './pagination';

const getTextbookElement = (): HTMLDivElement => {
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
  textbookWrapper.appendChild(renderGames());
  textbookWrapper.appendChild(renderGroupPagination());
  textbookWrapper.appendChild(renderPagination());
  textbookWrapper.appendChild(renderCards());
  return elem;
};

export default getTextbookElement;
