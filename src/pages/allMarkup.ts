import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from '../components/menu';
import addMainContent from './addMainContent';
import { renderMainTag, getMainPageElement } from './main/mainPage';
import createLoginListeners from '../components/header/createLoginListeners';
import { getLocalUser } from '../components/utils';
import renderLoginModal from '../components/modal-authorization/renderLoginModal';

const renderAllMarkup = () => {
  getLocalUser();
  renderLoginModal();
  renderMenu();
  renderHeader();
  createLoginListeners();
  renderMainTag();
  addMainContent(getMainPageElement());
  renderFooter();
};

export default renderAllMarkup;
