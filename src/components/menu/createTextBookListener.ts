import addMainContent from '../../pages/addMainContent';
import getTextbookElement from '../../pages/textbook/textbookPage';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import BASE_LINK from '../../services/settings';
import textbookStore from '../../store/texbookStore';
import renderSpinner from '../Spinner/renderSpinner';
import { updateHeader, updatePaginationButtons } from '../../utils';

const textBookListener = async () => {
  const textbookLink = document.getElementById('textbook-link') as HTMLLIElement;
  textbookLink.addEventListener('click', async () => {
    updateHeader('Textbook');
    const spinner = renderSpinner('black', 40);
    const finallyCallback = () => spinner.remove();
    const { textbookGroup, textbookPage } = textbookStore;
    const url = `${BASE_LINK}words?group=${textbookGroup}&page=${textbookPage}`;
    addMainContent(spinner);
    spinner.style.textAlign = 'center';

    const res = await fetchWithErrorHandling(url, finallyCallback);
    if (res) {
      textbookStore.words = res;
      addMainContent(getTextbookElement());
      updatePaginationButtons();
    }
  });
};

export default textBookListener;
