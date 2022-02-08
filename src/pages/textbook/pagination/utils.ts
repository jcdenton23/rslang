import textbookStore from '../../../store/textbookStore';
import { BASE_LINK, FIRST_PAGE, LAST_PAGE } from '../../../services/constants';
import { updateCards } from '../cards/utils';
import fetchWithErrorHandling from '../../../services/fetchWithErrorHandling';

export const updatePaginationButtons = () => {
  const nextBtn = document.querySelector('.pagination-next') as HTMLButtonElement;
  const prevBtn = document.querySelector('.pagination-prev') as HTMLButtonElement;

  const { textbookPage } = textbookStore;
  prevBtn.disabled = textbookPage === FIRST_PAGE;
  nextBtn.disabled = textbookPage === LAST_PAGE;
};

export const loadCardsPage = async (page: number, finallyCallback: () => void) => {
  const currentPage = document.querySelector('.current-page') as HTMLDivElement;

  const { textbookGroup } = textbookStore;
  const url = `${BASE_LINK}words?group=${textbookGroup}&page=${page}`;
  const res = await fetchWithErrorHandling(url, finallyCallback);

  if (res) {
    textbookStore.words = res;
    updateCards();
    currentPage.innerHTML = `Page: ${page + 1}`;
    textbookStore.textbookPage = page;
    updatePaginationButtons();
  }
};

export const loadCardsGroup = async (group: number, finallyCallback: () => void) => {
  const currentPage = document.querySelector('.current-page') as HTMLDivElement;
  const url = `${BASE_LINK}words?group=${group}&page=0`;

  const res = await fetchWithErrorHandling(url, finallyCallback);
  if (res) {
    textbookStore.words = res;
    textbookStore.textbookPage = 0;
    textbookStore.textbookGroup = group;
    updateCards();
    currentPage.innerHTML = `Page: ${textbookStore.textbookPage + 1}`;
    updatePaginationButtons();
  }
};
