import { updateStateAfterPagination } from '../../../utils';

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
      const group = +target.innerHTML - 1;
      updateStateAfterPagination('group', group);
    }
  });
};

export default groupPaginationListener;
