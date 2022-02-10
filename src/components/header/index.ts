import { auth } from '../constants';
import headerListeners from './createHeaderListeners';

const btnLogin = '<button type="button" id="btn-login" class="btn btn-primary">Login</button>';
const authorizedUser = () => `<div class="authorized-user d-flex align-items-baseline">
<p class="authorized-user_name px-2">${auth.name}</p>
<button type="button" id="btn-logout" class="btn btn-primary">Logout</button>
</div>`;

const renderHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
  <div class="hamburger">
        <span></span>
        <span class="long"></span>
        <span></span>
    </div>
    <div class="container">
        <div class="header__wrapper">
            <div class="header__title title title--fz16">Main</div>
            ${auth.name ? authorizedUser() : btnLogin}
        </div>
    </div>
  `;
  document.body.prepend(header);
  headerListeners();
};

export default renderHeader;
