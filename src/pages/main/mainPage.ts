import renderPromo from './promo';
import renderAdvantages from './advantages';
import renderTeams from './team';
import { Routes } from '../../components/enum';
import { IRouter } from '../../router/types';

export const renderMainTag = () => {
  const main = document.createElement('main');
  main.id = 'main';
  document.body.appendChild(main);
};

export const getMainPageElement = (router: IRouter): HTMLDivElement => {
  const elem = document.createElement('div');
  elem.classList.add('main-page');
  elem.innerHTML = `
    ${renderPromo()}
    ${renderAdvantages()}
    ${renderTeams()}
  `;

  const btnStart = elem.querySelector('.btn-main-start') as HTMLButtonElement;
  btnStart.addEventListener('click', () => {
    router.push(Routes.textbook);
  });
  return elem;
};
