import addMainContent from '../../pages/addMainContent';
import authStore from '../../store/authStore';
import { removeListeners } from '../../utils';
import updateHeader from '../header/utils';
import getStatisticsPageElement from '../statistic';
import getStatistics from '../statistic/utils';
import getAllUserWords from '../words/getUserWords';

const statisticsLinkHandler = async () => {
  removeListeners();
  updateHeader('Statistics');
  if (authStore.name) {
    await getStatistics();
    await getAllUserWords();
  }
  addMainContent(getStatisticsPageElement());
};

export default statisticsLinkHandler;
