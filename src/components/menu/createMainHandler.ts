import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import { removeListeners } from '../../utils';
import updateHeader from '../header/utils';

const mainLinkHandler = async () => {
  removeListeners();
  updateHeader('Main');
  addMainContent(getMainPageElement());
};

export default mainLinkHandler;
