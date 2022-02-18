import { IrenderAudioChallengeGame, IRequests, IWord } from '../../components/interfaces';
import renderSpinner from '../../components/Spinner/renderSpinner';
import createSpinnerWrapper from '../../components/Spinner/utils';
import addMainContent from '../../pages/addMainContent';
import { getMainPageElement } from '../../pages/main/mainPage';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import audioChallengeStore from '../../store/audioChallengeStore';
import { clearAndGetElement, shuffleArray } from '../../utils';

export const resetAudioChallengeStore = () => {
  audioChallengeStore.correctAnswers = 0;
  audioChallengeStore.wrongAnswers = 0;
  audioChallengeStore.currentInRow = 0;
  audioChallengeStore.questionNumber = 0;
  audioChallengeStore.maxInRow = 0;
  audioChallengeStore.correctWords = [];
  audioChallengeStore.wrongWords = [];
};

export const loadAudioChallengeGame = async (url: string, renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;

  const spinner = renderSpinner('black', 40);
  const spinnerWrapper = createSpinnerWrapper();
  spinnerWrapper.appendChild(spinner);
  gamesContent.append(spinnerWrapper);

  const finallyCallback = () => spinnerWrapper.remove();

  const request: IRequests = {
    url,
    finallyCallback,
    showNotification: true,
  };

  const res = await fetchWithErrorHandling<IWord[]>(request);

  if (res) {
    audioChallengeStore.words = shuffleArray(res);
    const { words, questionNumber } = audioChallengeStore;
    const currentWord = words[questionNumber];
    const restWords = shuffleArray(words.filter((word) => word.id !== currentWord.id));
    const optionsWords = shuffleArray([currentWord, restWords[0], restWords[1], restWords[2]]);
    gamesContent.append(renderAudioChallengeGame(currentWord, optionsWords));
  } else {
    addMainContent(getMainPageElement());
  }
};

export default loadAudioChallengeGame;
