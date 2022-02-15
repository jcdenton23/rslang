import { KKeys } from '../../../components/enum';
import { IrenderAudioChallengeGame, IWord } from '../../../components/interfaces';
import audioChallengeStore from '../../../store/audioChallengeStore';
import { removeListeners } from '../../../utils';
import nextBtnListener from './createNextBtnListener';

const renderAudioChallengeAnswer = (word: IWord, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const cardWrapper = document.querySelector('.audio-challenge__item') as HTMLDivElement;
  const btns = cardWrapper.querySelectorAll('.audio-challenge__item-btns .btn');
  const dunnoBtn = document.querySelector('.btn-audio-dunno') as HTMLButtonElement;
  const nextBtn = document.querySelector('.btn-audio-next') as HTMLButtonElement;

  removeListeners();

  const wordTitle = document.createElement('h3');
  wordTitle.textContent = `${word.word}: ${word.wordTranslate}`;
  cardWrapper.prepend(wordTitle);

  dunnoBtn.classList.toggle('hide');
  nextBtn.classList.toggle('hide');
  btns.forEach((btn) => (btn as HTMLButtonElement).setAttribute('disabled', 'true'));

  nextBtn.addEventListener('click', () => {
    nextBtnListener(renderAudioChallengeGame);
  });

  audioChallengeStore.arrowRightPressHandler = (event: KeyboardEvent) => {
    if (event.repeat) return;
    if (event.key === KKeys.ArrowRight) {
      nextBtnListener(renderAudioChallengeGame);
    }
  };
  document.addEventListener('keydown', audioChallengeStore.arrowRightPressHandler);
};

export default renderAudioChallengeAnswer;
