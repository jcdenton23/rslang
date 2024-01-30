import { IrenderAudioChallengeGame } from '../../../components/interfaces';
import { IRouter } from '../../../router/types';
import { BASE_LINK } from '../../../services/constants';
import audioChallengeStore from '../../../store/audioChallengeStore';
import { clearAndGetElement, shuffleArray } from '../../../utils';
import renderAudioChallengeResults from '../results/renderAudioChallengeResults';
import { loadNewAudioChallengeWords } from '../utils';

const nextBtnListener = async (renderAudioChallengeGame: IrenderAudioChallengeGame, router: IRouter) => {
  if (audioChallengeStore.arrowRightPressHandler) {
    document.removeEventListener('keydown', audioChallengeStore.arrowRightPressHandler);
  }

  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
  audioChallengeStore.currentQuestionNumber += 1;

  if (audioChallengeStore.currentQuestionNumber > 19) {
    gamesContent.append(renderAudioChallengeResults(renderAudioChallengeGame, router));
    return;
  }

  if (audioChallengeStore.words[audioChallengeStore.questionIndex + 1]) {
    audioChallengeStore.questionIndex += 1;
  } else if (audioChallengeStore.currentPage) {
    const { currentPage, currentGroup } = audioChallengeStore;
    const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage - 1}`;
    await loadNewAudioChallengeWords({
      url,
      router,
      page: currentPage - 1,
      group: currentGroup,
      renderAudioChallengeGame,
      renderAudioChallengeResults,
    });
    audioChallengeStore.currentPage -= 1;
  } else {
    gamesContent.append(renderAudioChallengeResults(renderAudioChallengeGame, router));
    return;
  }

  if (audioChallengeStore.isGameFinished) return;

  const { words, questionIndex, wordForOptions } = audioChallengeStore;
  const currentWord = words[questionIndex];
  const restWords = shuffleArray(wordForOptions.filter((word) => word.id !== currentWord.id));
  const optionsWords = shuffleArray([currentWord, restWords[0], restWords[1], restWords[2]]);
  gamesContent.append(renderAudioChallengeGame(currentWord, optionsWords, router));
};

export default nextBtnListener;
