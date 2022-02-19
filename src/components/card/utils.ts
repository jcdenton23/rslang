import { Difficulty } from '../enum';

const initializeCardStyles = (card: HTMLElement, difficulty: string | undefined, learned: boolean | undefined) => {
  if (difficulty === Difficulty.hard) {
    card.classList.add('bg-hard');
  }
  if (learned) {
    card.classList.add('bg-learned');
    const hardBtn = card.querySelector('#btn-hard') as HTMLButtonElement;
    hardBtn.disabled = true;
  }
};

export default initializeCardStyles;
