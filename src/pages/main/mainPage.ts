import renderPromo from './promo';
import renderAdvantages from './advantages';
import renderTeams from './team';

export const renderMainTag = () => {
  const main = document.createElement('main');
  main.id = 'main';
  document.body.appendChild(main);
};

export const getMainPageElement = (): HTMLDivElement => {
  const elem = document.createElement('div');
  elem.classList.add('main-page');
  elem.innerHTML = `
    ${renderPromo()}
    ${renderAdvantages()}
    ${renderTeams()}
  `;
  return elem;
};
