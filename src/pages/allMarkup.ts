import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from '../components/menu';
import addMainContent from './addMainContent';
import { renderMainTag, getMainPageElement } from './main/mainPage';
import renderLoginBox from '../components/modal_authorization/renderLoginBox';
import createLoginListeners from '../components/header/createLoginListeners';
import { getLocalUser } from '../components/utils';

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
