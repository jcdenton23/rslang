import renderMenu from './menu';
import hamburgerListener from '../listeners/hamburger-listener';

const renderHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');
  header.innerHTML = `
  ${renderMenu()}
  <div class="hamburger">
        <span></span>
        <span class="long"></span>
        <span></span>
    </div>
    <div class="container">
        <div class="header__wrapper">
            <div class="header__title title title--fz16">Main</div>
            <button type="button" class="btn btn-primary">Login</button>
        </div>
    </div>
  `;
  document.body.insertAdjacentElement('afterbegin', header);
  hamburgerListener();
};

export default renderHeader;
