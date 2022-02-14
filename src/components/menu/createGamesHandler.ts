import addMainContent from '../../pages/addMainContent';
import getGamesPageElement from '../../games/gamesPage';
import updateHeader from '../header/utils';
import { removeListeners } from '../../utils';

const gamesLinkHandler = async () => {
  removeListeners();
  updateHeader('Games');
  addMainContent(getGamesPageElement());
};

export default gamesLinkHandler;
