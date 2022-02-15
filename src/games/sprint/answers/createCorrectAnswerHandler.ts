import { IWord } from '../../../components/interfaces';
import sprintStore from '../../../store/sprintStore';

const correctAnswerHandler = (word: IWord) => {
  const audio = new Audio();
  sprintStore.correctWords.push(word);
  sprintStore.score += 10;
  sprintStore.correctAnswers += 1;
  sprintStore.currentInRow += 1;
  const { maxInRow, currentInRow } = sprintStore;
  sprintStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  audio.src = '../../../public/assets/sounds/correct.wav';
  audio.play();
};

export default correctAnswerHandler;