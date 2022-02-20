import textbookStore from '../../../store/textbookStore';
import createPaginationListener from './createPaginationListener';

const renderPagination = () => {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination', 'pagination-page');
  pagination.innerHTML = `
  <button class="btn btn-primary pagination-btn pagination-prev" data-direction="-1">Prev</button>
  <div class="current-page">Page: ${textbookStore.textbookPage + 1}</div>
  <button class="btn btn-primary pagination-btn pagination-next" data-direction="1">Next</button>
    `;
  createPaginationListener(pagination);

  return pagination;
};

export default renderPagination;
