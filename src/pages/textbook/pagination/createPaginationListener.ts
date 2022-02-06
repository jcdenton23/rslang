import textbookStore from '../../../store/texbookStore';
import { updateStateAfterPagination } from '../../../utils';

const createPaginationListener = (paginationEl: HTMLElement) => {
  const nextBtn = paginationEl.querySelector('.pagination-next') as HTMLButtonElement;
  const prevBtn = paginationEl.querySelector('.pagination-prev') as HTMLButtonElement;

  nextBtn.addEventListener('click', () => {
    if (textbookStore.textbookPage === 29) return;
    textbookStore.textbookPage += 1;
    updateStateAfterPagination('pagePagination');
  });

  prevBtn.addEventListener('click', () => {
    if (textbookStore.textbookPage === 0) return;
    textbookStore.textbookPage -= 1;
    updateStateAfterPagination('pagePagination');
  });
};

export default createPaginationListener;
