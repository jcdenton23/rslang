import { LearnedIn } from '../../../components/enum';
import { IWord } from '../../../components/interfaces';
import { updateWord } from '../../../components/words/utils';
import sprintStore from '../../../store/sprintStore';

const wrongAnswerHandler = (word: IWord) => {
  const audio = new Audio();
  const { maxInRow, currentInRow } = sprintStore;
  sprintStore.wrongWords.push(word);
  sprintStore.wrongAnswers += 1;
  sprintStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  sprintStore.currentInRow = 0;
  audio.src = './public/assets/sounds/wrong.wav';
  audio.play();
  updateWord(word.id, false, LearnedIn.sprint);
};

export default wrongAnswerHandler;
