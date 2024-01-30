import { LearnedIn } from '../../../components/enum';
import { IrenderAudioChallengeGame, IWord } from '../../../components/interfaces';
import { updateWord } from '../../../components/words/utils';
import { IRouter } from '../../../router/types';
import audioChallengeStore from '../../../store/audioChallengeStore';
import renderAudioChallengeAnswer from '../answers/renderAudioChallengeAnswer';

export const dunnoBtnHandler = (word: IWord, renderAudioChallengeGame: IrenderAudioChallengeGame, router: IRouter) => {
  const { maxInRow, currentInRow } = audioChallengeStore;
  audioChallengeStore.wrongWords.push(word);
  audioChallengeStore.wrongAnswers += 1;
  audioChallengeStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
  audioChallengeStore.currentInRow = 0;
  renderAudioChallengeAnswer(word, renderAudioChallengeGame, router);
  updateWord(word.id, false, LearnedIn.audio);
};

interface IDunnoBtnListener {
  elem: HTMLElement;
  word: IWord;
  renderAudioChallengeGame: IrenderAudioChallengeGame;
  router: IRouter;
}

const dunnoBtnListener = ({ elem, word, renderAudioChallengeGame, router }: IDunnoBtnListener) => {
  const dunnoBtn = elem.querySelector('.btn-audio-dunno') as HTMLButtonElement;
  dunnoBtn.addEventListener('click', () => {
    dunnoBtnHandler(word, renderAudioChallengeGame, router);
  });
};

export default dunnoBtnListener;
