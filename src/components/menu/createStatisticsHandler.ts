import addMainContent from '../../pages/addMainContent';
import { removeListeners } from '../../utils';
import updateHeader from '../header/utils';
import getStatisticsPageElement from '../statistic';
import getStatistics from '../statistic/utils';

const statisticsLinkHandler = async () => {
  removeListeners();
  updateHeader('Statistics');
  await getStatistics();

  addMainContent(getStatisticsPageElement());
};

export default statisticsLinkHandler;
