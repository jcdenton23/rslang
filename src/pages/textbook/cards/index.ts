import texbookStore from '../../../store/texbookStore';
import BASE_LINK from '../../../services/settings';
import audioListener from './createAudioListener';

const renderCards = () => {
  const cards = document.createElement('div');
  cards.classList.add('textbook__cards');
  const markup = texbookStore.words
    .map(
      (word, index) => `
<div class="textbook__card" id="textbook-card-${word.id}">
<div class="textbook__card-image">
<img src="${BASE_LINK}${word.image}" alt="image-${index}">
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
<div class="textbook__card-meaning">
  <p>${word.textMeaning}</p>
  <p class="translate">${word.textMeaningTranslate}</p>
</div>
<div class="textbook__card-example">
  <p>${word.textExample}</p>
  <p class="translate">${word.textExampleTranslate}</p>
</div>
</div>
</div>
`,
    )
    .join('');
  cards.innerHTML = markup;
  audioListener(cards);
  return cards;
};

export default renderCards;
