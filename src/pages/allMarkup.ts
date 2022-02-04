import renderHeader from '../components/header';
import renderMainMarkup from './main/mainPage';
import renderFooter from '../components/footer';

const renderAllMarkup = () => {
  renderHeader();
  renderMainMarkup();
  renderFooter();
};

export default renderAllMarkup;
