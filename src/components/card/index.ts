import { IWord } from '../interfaces';
import createAudioListener from './createAudioListener';

const renderCard = (word: IWord, baseLink: string) => {
  const card = document.createElement('div');
  card.classList.add('textbook__card');
  card.id = `textbook-card-${word.id}`;
  const markup = `
<div class="textbook__card-image">
<img src="${baseLink}${word.image}">
</div>
<div class="textbook__card-info">
<h3 class="textbook__card-title">${word.word} <span>${word.transcription}</span></h3>
<div class="textbook__card-volume">
  <i class="fas fa-volume-up"></i>
  <audio src="${baseLink}${word.audio}"></audio>
  <audio src="${baseLink}${word.audioMeaning}"></audio>
  <audio src="${baseLink}${word.audioExample}"></audio>
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
`;
  card.innerHTML = markup;
  createAudioListener(card);
  return card;
};

export default renderCard;
