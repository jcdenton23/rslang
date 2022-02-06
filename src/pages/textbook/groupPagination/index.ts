import groupPaginationListener from './createGroupPaginationListener';

const renderGroupPagination = () => {
  const nav = document.createElement('nav');
  nav.classList.add('group-pagination');
  nav.innerHTML = `
    <h4 class="group-pagination__title">Groups</h4>
    <ul class="group-pagination__items pagination pagination-md">
      <li class="page-item active" aria-current="page">
        <span class="page-link">1</span>
      </li>
      <li class="page-item"><a class="page-link">2</a></li>
      <li class="page-item"><a class="page-link">3</a></li>
      <li class="page-item"><a class="page-link">4</a></li>
      <li class="page-item"><a class="page-link">5</a></li>
      <li class="page-item"><a class="page-link">6</a></li>
    </ul>
    `;

  groupPaginationListener(nav);
  return nav;
};

export default renderGroupPagination;
