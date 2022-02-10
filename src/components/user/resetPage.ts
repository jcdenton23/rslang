import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import renderHeader from '../header';

export default function resetPage() {
  renderHeader();
  addMainContent(getMainPageElement());
}
