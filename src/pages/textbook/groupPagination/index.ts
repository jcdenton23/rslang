import authStore from '../../../store/authStore';
import groupPaginationListener from './createGroupPaginationListener';

const renderGroupPagination = () => {
  const nav = document.createElement('nav');
  nav.classList.add('group-pagination');
  nav.innerHTML = `
    <h4 class="group-pagination__title">Groups</h4>
    <ul class="group-pagination__items pagination pagination-md">
    <li class="page-item active"><a class="page-link border-primary" data-group="1">1</a></li>
      <li class="page-item"><a class="page-link border-info" data-group="2">2</a></li>
      <li class="page-item"><a class="page-link border-warning" data-group="3">3</a></li>
      <li class="page-item"><a class="page-link border-success" data-group="4">4</a></li>
      <li class="page-item"><a class="page-link border-danger" data-group="5">5</a></li>
      <li class="page-item"><a class="page-link border-secondary" data-group="6">6</a></li>
      ${authStore.name && '<li class="page-item"><a class="page-link border-primary" data-group="7">Hard</a></li>'}
    </ul>
    `;

  groupPaginationListener(nav);
  return nav;
};

export default renderGroupPagination;
