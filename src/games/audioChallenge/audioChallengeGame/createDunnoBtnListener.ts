import { IrenderAudioChallengeGame, IWord } from '../../../components/interfaces';
import audioChallengeStore from '../../../store/audioChallengeStore';
import renderAudioChallengeAnswer from '../answers/renderAudioChallengeAnswer';

export const dunnoBtnHandler = (word: IWord, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const { maxInRow, currentInRow } = audioChallengeStore;
  audioChallengeStore.wrongWords.push(word);
  audioChallengeStore.wrongAnswers += 1;
  audioChallengeStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  audioChallengeStore.currentInRow = 0;
  renderAudioChallengeAnswer(word, renderAudioChallengeGame);
};

const dunnoBtnListener = (elem: HTMLElement, word: IWord, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const dunnoBtn = elem.querySelector('.btn-audio-dunno') as HTMLButtonElement;
  dunnoBtn.addEventListener('click', () => {
    dunnoBtnHandler(word, renderAudioChallengeGame);
  });
};

export default dunnoBtnListener;
