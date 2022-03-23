import { BASE_LINK } from '../../services/constants';
import { IWord } from '../interfaces';

const audioListener = (card: HTMLDivElement, word: IWord) => {
  const toggleIcon = (icon: HTMLElement) => {
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-pause');
  };

  const volumeContainer = card.querySelector('.textbook__card-volume') as HTMLDivElement;
  let isPlay = false;

  volumeContainer.addEventListener('click', (e) => {
    const audioIcon = (e.currentTarget as HTMLElement).querySelector('i') as HTMLElement;
    const audio = volumeContainer.querySelector('audio') as HTMLAudioElement;

    toggleIcon(audioIcon);
    if (!isPlay) {
      isPlay = true;
      audio.src = `${BASE_LINK}${word.audio}`;
      audio.play();
      audio.onended = () => {
        audio.src = `${BASE_LINK}${word.audioMeaning}`;
        audio.play();
        audio.onended = () => {
          audio.src = `${BASE_LINK}${word.audioExample}`;
          audio.play();
          audio.onended = () => {
            toggleIcon(audioIcon);
            isPlay = false;
          };
        };
      };
    } else {
      audio.pause();
      audio.currentTime = 0;
      isPlay = false;
    }
  });
};

export default audioListener;
