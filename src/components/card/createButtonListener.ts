import { Button } from 'bootstrap';
import { toggleDifficulty, toggleLearned } from '../words/utils';

const buttonListener = (card: HTMLDivElement) => {
  const { id } = card.dataset;

  const btnHardOnPage = card.querySelector('#btn-hard') as HTMLButtonElement;
  const btnHard = new Button(btnHardOnPage);
  btnHardOnPage.addEventListener('click', () => {
    toggleDifficulty(id as string);
    btnHard.toggle();
  });

  const btnLearnedOnPage = card.querySelector('#btn-learned') as HTMLButtonElement;
  const btnlearned = new Button(btnLearnedOnPage);

  btnLearnedOnPage.addEventListener('click', () => {
    toggleLearned(id as string);
    const isActiveLearned = !btnLearnedOnPage.classList.contains('active');
    const isActiveHard = btnHardOnPage.classList.contains('active');
    btnHardOnPage.disabled = isActiveLearned;

    if (isActiveHard) {
      btnHard.toggle();
    }

    btnlearned.toggle();
  });
};

export default buttonListener;
