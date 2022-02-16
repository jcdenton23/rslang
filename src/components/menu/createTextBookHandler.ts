import addMainContent from '../../pages/addMainContent';
import getTextbookElement from '../../pages/textbook/textbookPage';
import { getMainPageElement } from '../../pages/main/mainPage';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import { BASE_LINK } from '../../services/constants';
import textbookStore from '../../store/textbookStore';
import renderSpinner from '../Spinner/renderSpinner';
import updateHeader from '../header/utils';
import { updatePaginationButtons } from '../../pages/textbook/pagination/utils';
import createSpinnerWrapper from '../Spinner/utils';
import { removeListeners } from '../../utils';
import { IRequests } from '../interfaces';

const textbookLinkHandler = async () => {
  removeListeners();
  updateHeader('Textbook');
  const spinner = renderSpinner('black', 40);
  const spinnerWrapper = createSpinnerWrapper();
  spinnerWrapper.appendChild(spinner);

  const finallyCallback = () => spinnerWrapper.remove();
  const { textbookGroup, textbookPage } = textbookStore;
  const url = `${BASE_LINK}words?group=${textbookGroup}&page=${textbookPage}`;
  addMainContent(spinnerWrapper);

  const request: IRequests = { url, finallyCallback, showNotification: true };

  const res = await fetchWithErrorHandling(request);
  if (res) {
    textbookStore.words = res;
    addMainContent(getTextbookElement());
    updatePaginationButtons();
  } else {
    addMainContent(getMainPageElement());
  }
};

export default textbookLinkHandler;
