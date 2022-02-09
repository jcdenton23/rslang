import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import updateHeader from '../header/utils';

const mainLinkHandler = async () => {
  updateHeader('Main');
  addMainContent(getMainPageElement());
};

export default mainLinkHandler;
