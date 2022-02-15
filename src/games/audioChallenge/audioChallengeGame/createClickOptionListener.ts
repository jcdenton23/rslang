import { IrenderAudioChallengeGame, IWord } from '../../../components/interfaces';
import audioChallengeAnswersHandler from '../answers/createAnswersHandler';

const clickOptionListener = (el: HTMLElement, word: IWord, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const btnsWrapper = el.querySelector('.audio-challenge__item-btns') as HTMLDivElement;

  btnsWrapper.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('btn')) {
      const { optionId } = target.dataset;

      const options = {
        word,
        optionId: String(optionId),
        renderAudioChallengeGame,
      };

      audioChallengeAnswersHandler(options);
    }
  });
};

export default clickOptionListener;
