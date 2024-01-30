import { loadCardsGroup } from '../pagination/utils';
import renderSpinner from '../../../components/Spinner/renderSpinner';
import textbookStore from '../../../store/textbookStore';
import { getCardClassName } from '../cards/utils';
import { loadHardwordCards } from './utils';

const groupPaginationListener = (nav: HTMLElement) => {
  const ulElement = nav.querySelector('ul') as HTMLUListElement;
  const listItems = nav.querySelectorAll('li');
  const links = nav.querySelectorAll('a');

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
      links.forEach((link) => link.classList.toggle('disable'));

      const spinner = renderSpinner('black', 30);
      nav.append(spinner);
      const finallyCallback = () => {
        links.forEach((link) => link.classList.toggle('disable'));
        spinner.remove();
      };

      const { group } = target.dataset;
      const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
      const pagination = textbookWrapper.querySelector('.pagination-page') as HTMLDivElement;
      const audioGameBtn = textbookWrapper.querySelector('.btn-audio') as HTMLButtonElement;
      const sprintGameBtn = textbookWrapper.querySelector('.btn-sprint') as HTMLButtonElement;
      const HARD_GROUP_NUMBER = 7;

      if (Number(group) === HARD_GROUP_NUMBER) {
        textbookWrapper.classList.remove('bg-learned-page');
        pagination.classList.add('hide');
        sprintGameBtn.disabled = true;
        audioGameBtn.disabled = true;
        loadHardwordCards(finallyCallback, 'border-primary');
        return;
      }

      pagination.classList.remove('hide');
      const cardClassName = getCardClassName(Number(group));
      loadCardsGroup(Number(group) - 1, finallyCallback, cardClassName);
    }
  });
};

export default groupPaginationListener;
