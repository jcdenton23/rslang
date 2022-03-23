import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from '../components/menu';
import { renderMainTag } from './main/mainPage';
import createLoginListeners from '../components/header/createLoginListeners';
import { getLocalUser } from '../components/utils';
import renderLoginModal from '../components/modal-authorization/renderLoginModal';
import router from '../router';
import { Routes } from '../components/enum';

const renderAllMarkup = () => {
  getLocalUser();
  renderLoginModal();
  renderMenu();
  renderHeader();
  createLoginListeners();
  renderMainTag();
  router.push(Routes.main);
  renderFooter();
};

export default renderAllMarkup;
