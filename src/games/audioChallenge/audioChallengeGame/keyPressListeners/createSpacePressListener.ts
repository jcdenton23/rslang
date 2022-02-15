import { KKeys } from '../../../../components/enum';
import audioChallengeStore from '../../../../store/audioChallengeStore';

const spacePressListener = (el: HTMLElement) => {
  const audioFile = el.querySelector('.audio-challenge__item-volume audio') as HTMLAudioElement;

  if (audioChallengeStore.spacePressHandler) {
    document.removeEventListener('keydown', audioChallengeStore.spacePressHandler);
  }

  audioChallengeStore.spacePressHandler = (event: KeyboardEvent) => {
    if (event.repeat) return;

    if (event.key === KKeys.space && event.target === document.body) {
      event.preventDefault();
      audioFile.play();
    }
  };
  document.addEventListener('keydown', audioChallengeStore.spacePressHandler);
};

export default spacePressListener;
