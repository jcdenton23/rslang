import { clearAndGetElement } from '../utils';
import renderSelectLevel from './renderSelectLevel';
import { Games } from '../components/enum';

const renderGamesStartPage = (): HTMLDivElement => {
  const elem = document.createElement('div');
  elem.classList.add('games__wrapper');
  elem.innerHTML = `
      <div class="games__item card">
      <div class="games__item-icon">
          <i class="fas fa-running"></i>
      </div>
      <h3 class="title title--fz20">Sprint</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum necessitatibus accusantium
          dignissimos atque repellendus labore illo temporibus vero unde quis saepe, at doloremque vel
          tempore in eligendi qui voluptatibus nisi.</p>
      <button type="button" class="btn btn-primary sprint-play-btn">Play</button>
    </div>
    <div class="games__item card">
      <div class="games__item-icon">
          <i class="fas fa-volume-up"></i>
      </div>
      <h3 class="title title--fz20">Audio challenge</h3>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum necessitatibus accusantium
          dignissimos atque repellendus labore illo temporibus vero unde quis saepe, at doloremque vel
          tempore in eligendi qui voluptatibus nisi.</p>
      <button type="button" class="btn btn-primary audio-play-btn" disabled>Play</button>
    </div>
      `;

  const playBtnHandler = (title: Games) => {
    const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
    gamesContent.append(renderSelectLevel(title, renderGamesStartPage));
  };

  const createPlayListener = () => {
    const sprintPlayBtn = elem.querySelector('.sprint-play-btn') as HTMLButtonElement;
    const audioPlayBtn = elem.querySelector('.audio-play-btn') as HTMLButtonElement;

    sprintPlayBtn.addEventListener('click', () => {
      playBtnHandler(Games.sprint);
    });

    audioPlayBtn.addEventListener('click', () => {
      playBtnHandler(Games.audio);
    });
  };

  createPlayListener();
  return elem;
};

export default renderGamesStartPage;
