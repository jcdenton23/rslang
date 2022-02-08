import textbookLinkHandler from './createTextBookHandler';
import mainLinkHandler from './createMainHandler';

const menuListeners = () => {
  const menu = document.querySelector('.menu') as HTMLDivElement;
  const closeElem = document.querySelector('.menu__close') as HTMLDivElement;
  const overlay = menu.querySelector('.menu__overlay') as HTMLDivElement;
  const menuList = menu.querySelector('.menu__list') as HTMLLIElement;

  const hideMenu = () => {
    menu.classList.remove('active');
  };

  closeElem.addEventListener('click', hideMenu);

  overlay.addEventListener('click', hideMenu);

  menuList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.menu__link')) {
      hideMenu();
    }
    if (target.closest('.textbook-link')) {
      textbookLinkHandler();
    }
    if (target.closest('.main-link')) {
      mainLinkHandler();
    }
  });
};

export default menuListeners;
