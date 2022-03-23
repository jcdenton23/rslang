import { IWord } from '../../../components/interfaces';
import { BASE_LINK } from '../../../services/constants';

const audioQuestionListener = (elem: HTMLElement, word: IWord) => {
  const audioWrapper = elem.querySelector('.audio-challenge__item-volume') as HTMLDivElement;
  const audioFile = new Audio();
  audioFile.src = `${BASE_LINK}${word.audio}`;
  audioFile.play();

  let isPlay = false;

  audioWrapper.addEventListener('click', () => {
    if (!isPlay) {
      isPlay = true;
      audioFile.play();
      audioFile.onended = () => {
        isPlay = false;
      };
    } else {
      audioFile.pause();
      audioFile.currentTime = 0;
      isPlay = false;
    }
  });
};

export default audioQuestionListener;
