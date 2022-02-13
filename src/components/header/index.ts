import authStore from '../../store/authStore';
import headerListeners from './createHeaderListeners';

const renderHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  const userName = authStore.name ? `<p class="authorized-user_name px-2">${authStore.name}</p>` : '';
  header.innerHTML = `
  <div class="hamburger">
        <span></span>
        <span class="long"></span>
        <span></span>
    </div>
    <div class="container">
        <div class="header__wrapper">
            <div class="header__title title title--fz16">Main</div>
            <div class="authorized-user d-flex align-items-baseline">
            ${userName}              
              <button type="button" id="btn-${authStore.name ? 'logout' : 'login'}" class="btn btn-primary">
              ${authStore.name ? 'Logout' : 'Login'}
              </button>
            </div>
        </div>
    </div>
  `;
  document.body.prepend(header);
  headerListeners();
};

export default renderHeader;
