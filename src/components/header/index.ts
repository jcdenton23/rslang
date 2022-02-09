import headerListeners from './createHeaderListeners';

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
            <button type="button" id='btn-login' class="btn btn-primary">Login</button>
        </div>
    </div>
  `;
  document.body.appendChild(header);
  headerListeners();
};

export default renderHeader;
