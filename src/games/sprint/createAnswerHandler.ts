import sprintStore from '../../store/sprintStore';
import { getRandomNum, clearAndGetElement } from '../../utils';
import { Answers } from '../../components/enum';
import { BASE_LINK } from '../../services/constants';
import { loadSprintNewWords } from './utils';
import { IRenderSprintGame, ISprintResult, IStartTimer, IWord } from '../../components/interfaces';

interface ISprintAnswer {
  word: IWord;
  translateWord: IWord;
  type: Answers;
  renderSprintGame: IRenderSprintGame;
  renderSprintResult: ISprintResult;
  startTimer: IStartTimer;
}

const sprintAnswerHandler = async (props: ISprintAnswer) => {
  const { word, translateWord, type, renderSprintGame, renderSprintResult, startTimer } = props;

  const { words, translateWords } = sprintStore;
  const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
  const answerCondition = type === Answers.correct ? word.id === translateWord.id : word.id !== translateWord.id;
  const audio = new Audio();

  if (answerCondition) {
    sprintStore.correctWords.push(word);
    sprintStore.score += 10;
    sprintStore.correctAnswers += 1;
    sprintStore.currentInRow += 1;
    audio.src = '../../../public/assets/sounds/correct.wav';
    audio.play();
  } else {
    const { maxInRow, currentInRow } = sprintStore;
    sprintStore.wrongWords.push(word);
    sprintStore.wrongAnswers += 1;
    sprintStore.maxInRow = currentInRow > maxInRow ? currentInRow : maxInRow;
    sprintStore.currentInRow = 0;
    audio.src = '../../../public/assets/sounds/wrong.wav';
    audio.play();
  }

  if (sprintStore.questionNumber < 19) {
    sprintStore.questionNumber += 1;
  } else if (sprintStore.questionNumber >= 19) {
    if (sprintStore.currentPage) {
      const { currentPage, currentGroup } = sprintStore;
      const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage - 1}`;
      loadSprintNewWords(url);
      sprintStore.currentPage -= 1;
    } else {
      const timerEl = document.querySelector('.timer') as HTMLDivElement;
      timerEl.remove();
      gamesContent.append(renderSprintResult(startTimer));
      return;
    }
  }

  const nextWord = words[sprintStore.questionNumber];
  const correctTranslateIndex = translateWords.findIndex((item) => item.id === nextWord.id);
  const nextTranslateIdx = Math.random() > 0.5 ? correctTranslateIndex : getRandomNum(0, translateWords.length - 1);
  gamesContent.append(renderSprintGame(nextWord, translateWords[nextTranslateIdx], renderSprintResult, startTimer));
};

export default sprintAnswerHandler;
