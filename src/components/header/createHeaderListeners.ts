const headerListeners = () => {
  const hamburger = document.querySelector('.hamburger') as HTMLDivElement;

  // modals[0] = new Modal(document.getElementById('login-modal') as HTMLDivElement);

  // if (document.querySelector('#btn-login')) {
  //   const btnLogin = document.querySelector('#btn-login') as HTMLButtonElement;

  //   btnLogin.addEventListener('click', () => {
  //     modals[0].show();
  //   });
  // }

  // if (document.querySelector('#btn-logout')) {
  //   const btnLogout = document.querySelector('#btn-logout') as HTMLButtonElement;

  //   btnLogout.addEventListener('click', () => {
  //     logout();
  //   });
  // }

  hamburger.addEventListener('click', () => {
    const menu = document.querySelector('.menu') as HTMLDivElement;
    menu.classList.add('active');
  });
};

export default headerListeners;
