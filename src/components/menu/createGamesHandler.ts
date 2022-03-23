import addMainContent from '../../pages/addMainContent';
import getGamesPageElement from '../../games/gamesPage';
import updateHeader from '../header/utils';
import { removeListeners } from '../../utils';
import router from '../../router';

const gamesLinkHandler = async () => {
  removeListeners();
  updateHeader('Games');
  addMainContent(getGamesPageElement(router));
};

export default gamesLinkHandler;
