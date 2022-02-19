import textbookStore from '../../../store/textbookStore';
import { BASE_LINK, FIRST_PAGE, LAST_PAGE } from '../../../services/constants';
import { updateCards } from '../cards/utils';
import fetchWithErrorHandling from '../../../services/fetchWithErrorHandling';
import { IRequests, IWord } from '../../../components/interfaces';
import authStore from '../../../store/authStore';
import { getAllUserWords } from '../../../components/words/utils';

export const updatePaginationButtons = () => {
  const nextBtn = document.querySelector('.pagination-next') as HTMLButtonElement;
  const prevBtn = document.querySelector('.pagination-prev') as HTMLButtonElement;

  const { textbookPage } = textbookStore;
  prevBtn.disabled = textbookPage === FIRST_PAGE;
  nextBtn.disabled = textbookPage === LAST_PAGE;
};

export const loadCardsPage = async (page: number, finallyCallback: () => void, cardClassName: string) => {
  const currentPage = document.querySelector('.current-page') as HTMLDivElement;

  const { textbookGroup } = textbookStore;
  const url = `${BASE_LINK}words?group=${textbookGroup}&page=${page}`;

  const request: IRequests = {
    url,
    finallyCallback,
    showNotification: true,
  };

  const res = await fetchWithErrorHandling<IWord[]>(request);

  if (res) {
    if (authStore.name) {
      await getAllUserWords();
    }

    textbookStore.words = res;
    updateCards(cardClassName);
    currentPage.innerHTML = `Page: ${page + 1}`;
    textbookStore.textbookPage = page;
    updatePaginationButtons();
  }
};

export const loadCardsGroup = async (group: number, finallyCallback: () => void, cardClassName: string) => {
  const currentPage = document.querySelector('.current-page') as HTMLDivElement;
  const url = `${BASE_LINK}words?group=${group}&page=0`;

  const request: IRequests = {
    url,
    finallyCallback,
    showNotification: true,
  };

  const res = await fetchWithErrorHandling<IWord[]>(request);
  if (res) {
    if (authStore.name) {
      await getAllUserWords();
    }
    textbookStore.words = res;
    textbookStore.textbookPage = 0;
    textbookStore.textbookGroup = group;
    textbookStore.cardClassName = cardClassName;
    updateCards(cardClassName);
    currentPage.innerHTML = 'Page: 1';
    updatePaginationButtons();
  }
};
