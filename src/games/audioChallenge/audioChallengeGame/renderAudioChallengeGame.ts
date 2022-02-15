import { IWord } from '../../../components/interfaces';
import { BASE_LINK } from '../../../services/constants';
import audioChallengeStore from '../../../store/audioChallengeStore';
import audioQuestionListener from './createAudioQuestionListener';
import clickOptionListener from './createClickOptionListener';
import dunnoBtnListener from './createDunnoBtnListener';
import arrowRightPressListener from './keyPressListeners/createArrowRightListener';
import numPressListener from './keyPressListeners/createNumPressListener';
import spacePressListener from './keyPressListeners/createSpacePressListener';

const renderAudioChallengeGame = (word: IWord, optionsWords: IWord[]) => {
  const audioChallenge = document.createElement('div');
  const [option1, option2, option3, option4] = optionsWords;
  audioChallenge.classList.add('audio-challenge');
  audioChallenge.innerHTML = `
        <h3 class="title title--fz20">${audioChallengeStore.questionNumber + 1} / 20</h3>
        <div class="audio-challenge__item card">
            <div class="audio-challenge__item-volume">
                <i class="fas fa-volume-up"></i>
                <audio src="${BASE_LINK}${word.audio}"></audio>
            </div>
            <div class="audio-challenge__item-btns">
                <button type="button" 
                class="btn btn-outline-primary" data-option-id=${option1.id}>1 ${option1.wordTranslate}</button>
                <button type="button" 
                class="btn btn-outline-primary" data-option-id=${option2.id}>2 ${option2.wordTranslate}</button>
                <button type="button" 
                class="btn btn-outline-primary" data-option-id=${option3.id}>3 ${option3.wordTranslate}</button>
                <button type="button" 
                class="btn btn-outline-primary" data-option-id=${option4.id}>4 ${option4.wordTranslate}</button>
            </div>
            <button type="button" class="btn btn-primary btn-audio-dunno">I don't know</button>
            <button type="button" class="btn btn-primary btn-audio-next hide">Next</button>
        </div>
    `;

  audioQuestionListener(audioChallenge);
  clickOptionListener(audioChallenge, word, renderAudioChallengeGame);
  dunnoBtnListener(audioChallenge, word, renderAudioChallengeGame);
  numPressListener(audioChallenge, word, renderAudioChallengeGame);
  spacePressListener(audioChallenge);
  arrowRightPressListener(word, renderAudioChallengeGame);
  return audioChallenge;
};
export default renderAudioChallengeGame;
