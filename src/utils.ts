import renderSpinner from './components/Spinner/renderSpinner';
import renderCards from './pages/textbook/cards';
import textbookStore from './store/texbookStore';
import BASE_LINK from './services/settings';
import fetchWithErrorHandling from './services/fetchWithErrorHandling';

export const updateCards = () => {
  const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
  const cards = textbookWrapper.querySelector('.textbook__cards') as HTMLDivElement;
  cards.remove();
  textbookWrapper.appendChild(renderCards());
};

export const updateHeader = (title: string) => {
  const headerTitle = document.querySelector('.header__title') as HTMLDivElement;
  headerTitle.textContent = title;
};

export const clearAndGetCards = () => {
  const cards = document.querySelector('.textbook__cards') as HTMLDivElement;
  cards.innerHTML = '';
  return cards;
};

export const updatePaginationButtons = () => {
  const nextBtn = document.querySelector('.pagination-next') as HTMLButtonElement;
  const prevBtn = document.querySelector('.pagination-prev') as HTMLButtonElement;

  const { textbookPage } = textbookStore;
  if (textbookPage === 0) {
    prevBtn.disabled = true;
  } else if (textbookPage === 29) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
};

export const updateStateAfterPagination = async (paginationType: string, group = textbookStore.textbookGroup) => {
  const currentPage = document.querySelector('.current-page') as HTMLDivElement;
  const cards = clearAndGetCards();
  const spinner = renderSpinner('black', 40);
  spinner.style.textAlign = 'center';
  cards.appendChild(spinner);

  const finallyCallback = () => spinner.remove();
  textbookStore.textbookGroup = group;
  if (paginationType === 'group') {
    textbookStore.textbookPage = 0;
  }
  const { textbookPage } = textbookStore;

  const url = `${BASE_LINK}words?group=${group}&page=${textbookPage}`;

  const res = await fetchWithErrorHandling(url, finallyCallback);
  if (res) {
    textbookStore.words = res;
    updateCards();
    updatePaginationButtons();
    currentPage.innerHTML = `Page: ${textbookPage + 1}`;
  }
};
