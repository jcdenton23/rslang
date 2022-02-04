import renderPromo from './promo';
import renderAdvantages from './advantages';
import renderTeams from './team';

const renderMainMarkup = () => {
  const main = document.createElement('main');
  main.id = 'main';
  main.innerHTML = `
    ${renderPromo()}
    ${renderAdvantages()}
    ${renderTeams()}
  `;
  document.body.appendChild(main);
};

export default renderMainMarkup;
