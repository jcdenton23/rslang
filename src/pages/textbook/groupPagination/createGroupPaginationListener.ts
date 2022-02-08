import { loadCardsGroup } from '../pagination/utils';
import renderSpinner from '../../../components/Spinner/renderSpinner';

const groupPaginationListener = (nav: HTMLElement) => {
  const ulElement = nav.querySelector('ul') as HTMLUListElement;
  const listItems = nav.querySelectorAll('li');
  ulElement.addEventListener('click', async (event) => {
    const target = event.target as HTMLAnchorElement;
    if (target.closest('.page-link')) {
      listItems.forEach((li) => {
        li.classList.remove('active');
      });
      const listItem = target.closest('.page-item') as HTMLLIElement;
      listItem.classList.add('active');
      const spinner = renderSpinner('black', 30);
      nav.append(spinner);
      const finallyCallback = () => spinner.remove();
      const group = target.dataset.group as string;
      loadCardsGroup(+group - 1, finallyCallback);
    }
  });
};

export default groupPaginationListener;
