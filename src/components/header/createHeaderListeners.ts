const headerListeners = () => {
  const hamburger = document.querySelector('.hamburger') as HTMLDivElement;

  hamburger.addEventListener('click', () => {
    const menu = document.querySelector('.menu') as HTMLDivElement;
    menu.classList.add('active');
  });
};

export default headerListeners;
