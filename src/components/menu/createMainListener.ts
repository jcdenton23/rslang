import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import { updateHeader } from '../../utils';

const mainLinkListener = async () => {
  const mainLink = document.getElementById('main-link') as HTMLLIElement;
  mainLink.addEventListener('click', async () => {
    updateHeader('Main');
    addMainContent(getMainPageElement());
  });
};

export default mainLinkListener;
