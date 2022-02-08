import textbookStore from '../../../store/textbookStore';
import { loadCardsPage } from './utils';
import renderSpinner from '../../../components/Spinner/renderSpinner';

const createPaginationListener = (paginationEl: HTMLElement) => {
  paginationEl.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('pagination-btn')) {
      target.disabled = true;
      const spinner = renderSpinner('white', 16);
      const finallyCallback = () => {
        spinner.remove();
        target.disabled = false;
      };
      const direction = Number(target.dataset.direction);
      target.append(spinner);
      loadCardsPage(textbookStore.textbookPage + direction, finallyCallback);
    }
  });
};

export default createPaginationListener;
