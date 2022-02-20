import { Keys } from '../../../../components/enum';
import { IKeyPressListener } from '../../../../components/interfaces';
import audioChallengeStore from '../../../../store/audioChallengeStore';
import audioChallengeAnswersHandler from '../../answers/createAnswersHandler';

const numPressListener = ({ el, word, renderAudioChallengeGame, router }: IKeyPressListener) => {
  const optionButtons = el.querySelectorAll('.audio-challenge__item-btns .btn') as NodeListOf<HTMLButtonElement>;
  const getOptionId = (index: number, buttons: NodeListOf<HTMLButtonElement>) => buttons[index - 1].dataset.optionId;

  if (audioChallengeStore.numPressHandler) {
    document.removeEventListener('keydown', audioChallengeStore.numPressHandler);
  }

  audioChallengeStore.numPressHandler = (event: KeyboardEvent) => {
    if (event.repeat) return;

    const { key } = event;
    const keys = [Keys.one, Keys.two, Keys.three, Keys.four];

    if (!keys.includes(key as Keys)) {
      return;
    }
    const optionId = getOptionId(Number(key), optionButtons);

    const options = {
      word,
      optionId: String(optionId),
      renderAudioChallengeGame,
      router,
    };

    audioChallengeAnswersHandler(options);
  };

  document.addEventListener('keydown', audioChallengeStore.numPressHandler);
};

export default numPressListener;
