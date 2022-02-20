import audioChallengeStore from '../../../store/audioChallengeStore';
import renderAudioChallengeAnswer from './renderAudioChallengeAnswer';
import { IAnswerHandler } from '../../../components/interfaces';
import { updateWord } from '../../../components/words/utils';

const correctAnswerHandler = ({ word, optionId, renderAudioChallengeGame, router }: IAnswerHandler) => {
  const selectedOption = document.querySelector(`button[data-option-id="${optionId}"]`) as HTMLButtonElement;
  selectedOption.classList.remove('btn-outline-primary');
  selectedOption.classList.add('btn-success');
  audioChallengeStore.correctWords.push(word);
  audioChallengeStore.correctAnswers += 1;
  audioChallengeStore.currentInRow += 1;
  const { maxInRow, currentInRow } = audioChallengeStore;
  audioChallengeStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  renderAudioChallengeAnswer(word, renderAudioChallengeGame, router);
  updateWord(word.id, true);
};

const wrongAnswerHandler = ({ word, optionId, renderAudioChallengeGame, router }: IAnswerHandler) => {
  const selectedOption = document.querySelector(`button[data-option-id="${optionId}"]`) as HTMLButtonElement;
  selectedOption.classList.remove('btn-outline-primary');
  selectedOption.classList.add('btn-danger');
  const { maxInRow, currentInRow } = audioChallengeStore;
  audioChallengeStore.wrongWords.push(word);
  audioChallengeStore.wrongAnswers += 1;
  audioChallengeStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  audioChallengeStore.currentInRow = 0;
  renderAudioChallengeAnswer(word, renderAudioChallengeGame, router);
  updateWord(word.id, false);
};

const audioChallengeAnswersHandler = ({ word, optionId, renderAudioChallengeGame, router }: IAnswerHandler) => {
  if (optionId === word.id) {
    correctAnswerHandler({ word, optionId, renderAudioChallengeGame, router });
  } else {
    wrongAnswerHandler({ word, optionId, renderAudioChallengeGame, router });
  }
};

export default audioChallengeAnswersHandler;
