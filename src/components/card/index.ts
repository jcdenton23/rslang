import { IRenderCard } from '../interfaces';
import { BASE_LINK } from '../../services/constants';
import createAudioListener from './createAudioListener';
import userWordsStore from '../../store/userWordsStore';
import { Difficulty } from '../enum';
import authStore from '../../store/authStore';
import createButtonListener from './createButtonListener';
import createRemoveBtnListener from './createRemoveBtnListener';
import initializeCardStyles from './utils';

const renderCard = (props: IRenderCard) => {
  const { word, cardClassName, loadHardwordCards, isHardCard, checkIsPageLearned } = props;
  const userWord = userWordsStore.words?.find((currentWord) => currentWord.wordId === word.id);

  const learned = userWord?.optional.learned;
  const difficulty = userWord?.difficulty;
  const card = document.createElement('div');
  card.classList.add('textbook__card', cardClassName);
  card.dataset.id = word.id;

  const removeBtn = `
  <button type="button" id="btn-remove" 
      class="btn btn-outline-warning">Remove</button>
  `;

  const wordAnswers = `<div>
  <span class="badge bg-success">${userWord ? userWord?.optional.correctAnswer : '0'}</span>
  <span class="badge bg-danger">${userWord ? userWord?.optional.wrongAnswer : '0'}</span>
</div>`;

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
    ${authStore.name ? wordAnswers : ''}
    <div class="textbook__card-volume">
    <i class="fas fa-volume-up"></i>
    <audio src="${BASE_LINK}${word.audio}"></audio>
    </div>
    <p class="textbook__card-translate translate">${word.wordTranslate}</p>
    ${authStore.name && !isHardCard ? buttons : ''}
    ${authStore.name && isHardCard ? removeBtn : ''}
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

  createAudioListener(card, word);
  if (authStore.name) {
    initializeCardStyles(card, difficulty, learned);
  }

  if (authStore.name && !isHardCard) {
    createButtonListener(card, checkIsPageLearned);
  }

  if (authStore.name && isHardCard) {
    createRemoveBtnListener(card, cardClassName, loadHardwordCards);
  }

  return card;
};

export default renderCard;
