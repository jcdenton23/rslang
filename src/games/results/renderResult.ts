import { IWord } from '../../components/interfaces';
import { BASE_LINK } from '../../services/constants';
import audioAnswerListener from './createAudioAnswerListener';

const renderResult = (word: IWord) => {
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
  audioAnswerListener(resultItem);

  return resultItem;
};

export default renderResult;
