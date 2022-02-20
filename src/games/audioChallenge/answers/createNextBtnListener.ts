import { IrenderAudioChallengeGame } from '../../../components/interfaces';
import { IRouter } from '../../../router/types';
import audioChallengeStore from '../../../store/audioChallengeStore';
import { clearAndGetElement, shuffleArray } from '../../../utils';
import renderAudioChallengeResults from '../results/renderAudioChallengeResults';

const nextBtnListener = (renderAudioChallengeGame: IrenderAudioChallengeGame, router: IRouter) => {
  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
  if (audioChallengeStore.questionNumber >= 19) {
    gamesContent.append(renderAudioChallengeResults(renderAudioChallengeGame, router));
    return;
  }

  audioChallengeStore.questionNumber += 1;
  const { words, questionNumber } = audioChallengeStore;
  const currentWord = words[questionNumber];
  const restWords = shuffleArray(words.filter((word) => word.id !== currentWord.id));
  const optionsWords = shuffleArray([currentWord, restWords[0], restWords[1], restWords[2]]);
  gamesContent.append(renderAudioChallengeGame(currentWord, optionsWords, router));
};

export default nextBtnListener;
