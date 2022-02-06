import textbookStore from '../../../store/texbookStore';
import createPaginationListener from './createPaginationListener';

const renderPagination = () => {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.innerHTML = `
  <button class="btn btn-primary pagination-prev">Prev</button>
  <div class="current-page">Page: ${textbookStore.textbookPage + 1}</div>
  <button class="btn btn-primary pagination-next">Next</button>
    `;
  createPaginationListener(pagination);

  return pagination;
};

export default renderPagination;
