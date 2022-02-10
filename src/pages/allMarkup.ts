import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from '../components/menu';
import addMainContent from './addMainContent';
import { renderMainTag, getMainPageElement } from './main/mainPage';
import renderLoginBox from '../components/user/renderLoginBox';
import getLocalUser from '../components/user/getLocalUser';
import createLoginListeners from '../components/user/createLoginListeners';

const renderAllMarkup = () => {
  getLocalUser();
  renderLoginBox();
  renderMenu();
  renderHeader();
  createLoginListeners();
  renderMainTag();
  addMainContent(getMainPageElement());
  renderFooter();
};

export default renderAllMarkup;
