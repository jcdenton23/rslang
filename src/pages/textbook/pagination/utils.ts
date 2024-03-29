import textbookStore from '../../../store/textbookStore';
import { BASE_LINK, FIRST_PAGE, LAST_PAGE } from '../../../services/constants';
import { IRequests, IWord } from '../../../components/interfaces';
import fetchWithErrorHandling from '../../../services/fetchWithErrorHandling';
import authStore from '../../../store/authStore';
import getAllUserWords from '../../../components/words/getUserWords';
import { checkIsPageLearned } from '../groupPagination/utils';
import { updateCards } from '../cards/utils';

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
      await checkIsPageLearned(page, textbookGroup);
    }
    textbookStore.words = res;
    updateCards({ cardClassName, isHardCard: false, checkIsPageLearned });
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
      await checkIsPageLearned(0, group);
    }
    textbookStore.words = res;
    textbookStore.textbookPage = 0;
    textbookStore.textbookGroup = group;
    textbookStore.cardClassName = cardClassName;
    updateCards({ cardClassName, isHardCard: false, checkIsPageLearned });
    currentPage.innerHTML = 'Page: 1';
    updatePaginationButtons();
  }
};
