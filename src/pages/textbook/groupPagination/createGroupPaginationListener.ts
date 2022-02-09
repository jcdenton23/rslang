import { loadCardsGroup } from '../pagination/utils';
import renderSpinner from '../../../components/Spinner/renderSpinner';
import textbookStore from '../../../store/textbookStore';
import { getCardClassName } from '../cards/utils';

const groupPaginationListener = (nav: HTMLElement) => {
  const ulElement = nav.querySelector('ul') as HTMLUListElement;
  const listItems = nav.querySelectorAll('li');

  const removeActiveClass = () => {
    listItems.forEach((li) => {
      li.classList.remove('active');
    });
  };

  const initializeActiveClass = () => {
    removeActiveClass();
    const { textbookGroup } = textbookStore;
    listItems[textbookGroup].classList.add('active');
  };

  initializeActiveClass();

  ulElement.addEventListener('click', async (event) => {
    const target = event.target as HTMLAnchorElement;
    if (target.closest('.page-link')) {
      removeActiveClass();
      const listItem = target.closest('.page-item') as HTMLLIElement;
      listItem.classList.add('active');
      const spinner = renderSpinner('black', 30);
      nav.append(spinner);
      const finallyCallback = () => spinner.remove();
      const { group } = target.dataset;
      const cardClassName = getCardClassName(Number(group));
      loadCardsGroup(Number(group) - 1, finallyCallback, cardClassName);
    }
  });
};

export default groupPaginationListener;
