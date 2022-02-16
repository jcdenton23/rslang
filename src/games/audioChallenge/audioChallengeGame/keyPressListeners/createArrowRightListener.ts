import { Keys } from '../../../../components/enum';
import { IrenderAudioChallengeGame, IWord } from '../../../../components/interfaces';
import audioChallengeStore from '../../../../store/audioChallengeStore';
import { dunnoBtnHandler } from '../createDunnoBtnListener';

const arrowRightPressListener = (word: IWord, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  if (audioChallengeStore.arrowRightPressHandler) {
    document.removeEventListener('keydown', audioChallengeStore.arrowRightPressHandler);
  }

  audioChallengeStore.arrowRightPressHandler = (event: KeyboardEvent) => {
    if (event.repeat) return;

    if (event.key === Keys.ArrowRight) {
      dunnoBtnHandler(word, renderAudioChallengeGame);
    }
  };
  document.addEventListener('keydown', audioChallengeStore.arrowRightPressHandler);
};

export default arrowRightPressListener;
