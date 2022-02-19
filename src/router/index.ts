import { Routes } from '../components/enum';
import getGamesPageElement from '../games/gamesPage';
import addMainContent from '../pages/addMainContent';
import { getMainPageElement } from '../pages/main/mainPage';
import getTextbookElement from '../pages/textbook/textbookPage';
import { IRouter } from './types';

const router: IRouter = {
  push(route: string) {
    switch (route) {
      case Routes.main: {
        addMainContent(getMainPageElement(this));
        break;
      }
      case Routes.textbook: {
        addMainContent(getTextbookElement(this));
        break;
      }
      case Routes.games: {
        addMainContent(getGamesPageElement(this));
        break;
      }
      case Routes.statistic: {
        addMainContent(getMainPageElement(this));
        break;
      }
      default:
        addMainContent(getMainPageElement(this));
        break;
    }
  },
};

export default router;
