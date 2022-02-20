import { Answers } from '../../../components/enum';
import { IRenderSprintGame, ISprintResult, IStartTimer, IWord } from '../../../components/interfaces';
import { IRouter } from '../../../router/types';
import { BASE_LINK } from '../../../services/constants';
import sprintStore from '../../../store/sprintStore';
import { clearAndGetElement, getRandomNum } from '../../../utils';
import { loadSprintNewWords } from '../utils';
import correctAnswerHandler from './createCorrectAnswerHandler';
import wrongAnswerHandler from './createWrongAnswerHandler';

interface ISprintAnswer {
  word: IWord;
  translateWord: IWord;
  type: Answers;
  renderSprintGame: IRenderSprintGame;
  renderSprintResult: ISprintResult;
  startTimer: IStartTimer;
  router: IRouter;
}

const sprintAnswerHandler = async (props: ISprintAnswer) => {
  const { word, translateWord, type, renderSprintGame, renderSprintResult, startTimer, router } = props;

  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
  const answerCondition = type === Answers.correct ? word.id === translateWord.id : word.id !== translateWord.id;
  if (sprintStore.btnPressHandler) {
    document.removeEventListener('keydown', sprintStore.btnPressHandler);
  }
  if (answerCondition) {
    correctAnswerHandler(word);
  } else {
    wrongAnswerHandler(word);
  }

  if (sprintStore.words[sprintStore.questionNumber + 1]) {
    sprintStore.questionNumber += 1;
  } else if (sprintStore.currentPage) {
    const { currentPage, currentGroup } = sprintStore;
    const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage - 1}`;
    await loadSprintNewWords({
      url,
      router,
      page: currentPage - 1,
      group: currentGroup,
      renderSprintResult,
      startTimer,
    });
    sprintStore.currentPage -= 1;
  } else {
    const timerEl = document.querySelector('.timer') as HTMLDivElement;
    timerEl.remove();
    gamesContent.append(renderSprintResult(startTimer, router));
    return;
  }

  if (sprintStore.isGameFinished) return;

  const { words, translateWords } = sprintStore;
  const nextWord = words[sprintStore.questionNumber];
  const correctTranslateIndex = translateWords.findIndex((item) => item.id === nextWord.id);
  const nextTranslateIdx = Math.random() > 0.5 ? correctTranslateIndex : getRandomNum(0, translateWords.length - 1);

  const options = {
    word: nextWord,
    translateWord: translateWords[nextTranslateIdx],
    renderSprintResult,
    startTimer,
    router,
  };

  gamesContent.append(renderSprintGame(options));
};

export default sprintAnswerHandler;
