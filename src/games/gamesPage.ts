import renderGamesStartPage from './gamesStartPage';

const getGamesPageElement = (): HTMLDivElement => {
  const elem = document.createElement('div');
  elem.classList.add('games-page');
  elem.innerHTML = `
    <section class="games">
    <div class="container">
        <div class="games__content">
        </div>
    </div>
    </section>
    `;
  const gamesContentEl = elem.querySelector('.games__content') as HTMLDivElement;
  gamesContentEl.append(renderGamesStartPage());
  return elem;
};

export default getGamesPageElement;
