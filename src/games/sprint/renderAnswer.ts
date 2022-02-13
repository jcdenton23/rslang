import { BASE_LINK } from '../../services/constants';
import { IWord } from '../../components/interfaces';

const renderAnswer = (word: IWord) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('results__item');
  resultItem.innerHTML = `
    <div class="results__volume">
              <i class="fas fa-volume-up"></i>
              <audio src="${BASE_LINK}${word.audio}"></audio>
              </div>
              <h3 class="results__word">${word.word}:</h3>
              <h3 class="results__word-translate">${word.wordTranslate}</h3>
            </div>
    `;

  const volumeWrapper = resultItem.querySelector('.results__volume') as HTMLDivElement;

  const toggleIcon = (icon: HTMLElement) => {
    icon.classList.toggle('fa-volume-up');
    icon.classList.toggle('fa-pause');
  };

  let isPlay = false;
  volumeWrapper.addEventListener('click', (e) => {
    const audioIcon = (e.currentTarget as HTMLElement).querySelector('i') as HTMLElement;
    const audioFile = (e.currentTarget as HTMLElement).querySelector('audio') as HTMLAudioElement;
    toggleIcon(audioIcon);
    if (!isPlay) {
      isPlay = true;
      audioFile.play();
      audioFile.onended = () => {
        toggleIcon(audioIcon);
        isPlay = false;
      };
    } else {
      audioFile.pause();
      audioFile.currentTime = 0;
      isPlay = false;
    }
  });

  return resultItem;
};

export default renderAnswer;
