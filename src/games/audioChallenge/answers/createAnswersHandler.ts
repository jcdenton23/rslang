import { IrenderAudioChallengeGame, IWord } from '../../../components/interfaces';
import audioChallengeStore from '../../../store/audioChallengeStore';
import renderAudioChallengeAnswer from './renderAudioChallengeAnswer';

const correctAnswerHandler = (word: IWord, optionId: string, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const selectedOption = document.querySelector(`button[data-option-id="${optionId}"]`) as HTMLButtonElement;
  selectedOption.classList.remove('btn-outline-primary');
  selectedOption.classList.add('btn-success');
  audioChallengeStore.correctWords.push(word);
  audioChallengeStore.correctAnswers += 1;
  audioChallengeStore.currentInRow += 1;
  const { maxInRow, currentInRow } = audioChallengeStore;
  audioChallengeStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  renderAudioChallengeAnswer(word, renderAudioChallengeGame);
};

const wrongAnswerHandler = (word: IWord, optionId: string, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const selectedOption = document.querySelector(`button[data-option-id="${optionId}"]`) as HTMLButtonElement;
  selectedOption.classList.remove('btn-outline-primary');
  selectedOption.classList.add('btn-danger');
  const { maxInRow, currentInRow } = audioChallengeStore;
  audioChallengeStore.wrongWords.push(word);
  audioChallengeStore.wrongAnswers += 1;
  audioChallengeStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  audioChallengeStore.currentInRow = 0;
  renderAudioChallengeAnswer(word, renderAudioChallengeGame);
};

interface IAudioChallangeAnsHandler {
  word: IWord;
  optionId: string;
  renderAudioChallengeGame: IrenderAudioChallengeGame;
}

const audioChallengeAnswersHandler = (props: IAudioChallangeAnsHandler) => {
  const { word, optionId, renderAudioChallengeGame } = props;

  if (optionId === word.id) {
    correctAnswerHandler(word, optionId, renderAudioChallengeGame);
  } else {
    wrongAnswerHandler(word, optionId, renderAudioChallengeGame);
  }
};

export default audioChallengeAnswersHandler;
