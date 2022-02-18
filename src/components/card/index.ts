import { IWord } from '../interfaces';
import { BASE_LINK } from '../../services/constants';
import createAudioListener from './createAudioListener';
import userWordsStore from '../../store/userWordsStore';
import { Difficulty } from '../enum';
import authStore from '../../store/authStore';
import createButtonListener from './createButtonListener';

const renderCard = (word: IWord, classCardName: string) => {
  const userWord = userWordsStore.words?.find((currentWord) => currentWord.wordId === word.id);

  const learned = userWord?.optional.learned;
  const difficulty = userWord?.difficulty;
  const card = document.createElement('div');
  card.classList.add('textbook__card', classCardName);
  card.dataset.id = word.id;

  const buttons = `
<button type="button" id="btn-learned" 
class="btn btn-outline-success ${learned ? 'active' : ''}">Learned</button>
<button type="button" id="btn-hard" 
class="btn btn-outline-warning ${difficulty === Difficulty.hard ? 'active' : ''}">Hard</button>`;

  const markup = `
    <div class="textbook__card-image">
    <img src="${BASE_LINK}${word.image}">
    </div>
    <div class="textbook__card-info">
    <h3 class="textbook__card-title">${word.word} <span>${word.transcription}</span></h3>
    <div class="textbook__card-volume">
    <i class="fas fa-volume-up"></i>
    <audio src="${BASE_LINK}${word.audio}"></audio>
    <audio src="${BASE_LINK}${word.audioMeaning}"></audio>
    <audio src="${BASE_LINK}${word.audioExample}"></audio>
    </div>
    <p class="textbook__card-translate translate">${word.wordTranslate}</p>
    ${authStore.name ? buttons : ''}
    <div class="textbook__card-meaning">
      <p>${word.textMeaning}</p>
      <p class="translate">${word.textMeaningTranslate}</p>
    </div>
    <div class="textbook__card-example">
      <p>${word.textExample}</p>
      <p class="translate">${word.textExampleTranslate}</p>
    </div>
    </div>
`;

  card.innerHTML = markup;

  createAudioListener(card);
  if (authStore.name) {
    createButtonListener(card);
  }
  return card;
};

export default renderCard;
