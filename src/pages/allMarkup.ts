import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from '../components/menu';
import addMainContent from './addMainContent';
import { renderMainTag, getMainPageElement } from './main/mainPage';

const renderAllMarkup = () => {
  renderMenu();
  renderHeader();
  renderMainTag();
  addMainContent(getMainPageElement());
  renderFooter();
};

export default renderAllMarkup;
