import { IGamesStartPage } from '../../components/interfaces';
import backBtnListener from './createBackBtnListener';
import selectLevelListener from './createSelectLevelListener';

const renderSelectLevel = (levelTitle: string, renderGamesStartPage: IGamesStartPage) => {
  const elem = document.createElement('div');
  elem.classList.add('games__level');
  elem.innerHTML = `
    <h3 class="title title--fz48">${levelTitle}</h3>
    <h3 class="title title--fz36">Select the level</h3>
    <div class="games__level-btns">
      <button type="button" class="btn btn-primary btn-lg" data-group="1">1</button>
      <button type="button" class="btn btn-info btn-lg" data-group="2">2</button>
      <button type="button" class="btn btn-warning btn-lg" data-group="3">3</button>
      <button type="button" class="btn btn-success btn-lg" data-group="4">4</button>
      <button type="button" class="btn btn-danger btn-lg" data-group="5">5</button>
      <button type="button" class="btn btn-secondary btn-lg" data-group="6">6</button>
    </div>
        <button type="button" class="btn btn-primary back-games-btn">Back</button>
      `;

  backBtnListener(elem, renderGamesStartPage);
  selectLevelListener(elem, levelTitle);

  return elem;
};

export default renderSelectLevel;
