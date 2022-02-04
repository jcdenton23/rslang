const hamburgerListener = () => {
  const hamburger = document.querySelector('.hamburger') as HTMLDivElement;
  const menu = document.querySelector('.menu') as HTMLDivElement;
  const closeElem = document.querySelector('.menu__close') as HTMLDivElement;
  const overlay = menu.querySelector('.menu__overlay') as HTMLDivElement;
  const menuLinks = menu.querySelectorAll('.menu__link');

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
  });

  closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
};

export default hamburgerListener;
