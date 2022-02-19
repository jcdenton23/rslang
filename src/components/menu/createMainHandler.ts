import router from '../../router';
import { removeListeners } from '../../utils';
import { Routes } from '../enum';
import updateHeader from '../header/utils';

const mainLinkHandler = async () => {
  removeListeners();
  updateHeader('Main');
  router.push(Routes.main);
};

export default mainLinkHandler;
