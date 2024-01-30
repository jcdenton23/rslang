import { Button } from 'bootstrap';
import textbookStore from '../../store/textbookStore';
import { ICheckPageIsLearned } from '../interfaces';
import renderSpinner from '../Spinner/renderSpinner';
import getAllUserWords from '../words/getUserWords';
import { toggleDifficulty, toggleLearned } from '../words/utils';

const buttonListener = (card: HTMLDivElement, checkIsPageLearned: ICheckPageIsLearned) => {
  const { id } = card.dataset;

  const btnHardOnPage = card.querySelector('#btn-hard') as HTMLButtonElement;
  const btnHard = new Button(btnHardOnPage);
  const btnLearnedOnPage = card.querySelector('#btn-learned') as HTMLButtonElement;
  const btnlearned = new Button(btnLearnedOnPage);

  btnHardOnPage.addEventListener('click', async () => {
    const { textbookPage, textbookGroup } = textbookStore;
    btnHardOnPage.disabled = true;
    btnLearnedOnPage.disabled = true;
    const spinner = renderSpinner('black', 16);
    btnHardOnPage.append(spinner);

    await toggleDifficulty(id as string);
    if (checkIsPageLearned) await checkIsPageLearned(textbookPage, textbookGroup);

    card.classList.toggle('bg-hard');
    btnHardOnPage.disabled = false;
    btnLearnedOnPage.disabled = false;
    spinner.remove();
    btnHard.toggle();
  });

  btnLearnedOnPage.addEventListener('click', async () => {
    const { textbookPage, textbookGroup } = textbookStore;
    btnLearnedOnPage.disabled = true;
    btnHardOnPage.disabled = true;
    const spinner = renderSpinner('black', 16);
    btnLearnedOnPage.append(spinner);

    await getAllUserWords();
    await toggleLearned(id as string);
    if (checkIsPageLearned) await checkIsPageLearned(textbookPage, textbookGroup);

    card.classList.toggle('bg-learned');
    const isActiveLearned = !btnLearnedOnPage.classList.contains('active');
    const isActiveHard = btnHardOnPage.classList.contains('active');
    btnHardOnPage.disabled = isActiveLearned;
    btnLearnedOnPage.disabled = false;
    spinner.remove();

    if (isActiveHard) {
      btnHard.toggle();
      card.classList.toggle('bg-hard');
    }

    btnlearned.toggle();
  });
};

export default buttonListener;
