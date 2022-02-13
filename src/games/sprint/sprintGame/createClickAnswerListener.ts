import { IRenderSprintGame, ISprintResult, IStartTimer, IWord } from '../../../components/interfaces';
import sprintAnswerHandler from '../answers/createAnswerHandler';
import { Answers } from '../../../components/enum';

export interface IAnswer {
  word: IWord;
  translateWord: IWord;
  renderSprintGame: IRenderSprintGame;
  renderSprintResult: ISprintResult;
  startTimer: IStartTimer;
}

const clickAnswerListener = (elem: HTMLElement, props: IAnswer) => {
  const { word, translateWord, renderSprintGame, renderSprintResult, startTimer } = props;

  const btnsWrapper = elem.querySelector('.sprint-item-btns') as HTMLDivElement;
  btnsWrapper.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;

    const checkAnswer = (answer: Answers) => {
      sprintAnswerHandler({
        word,
        translateWord,
        renderSprintGame,
        renderSprintResult,
        startTimer,
        type: answer,
      });
    };

    if (target.closest('.btn-correct')) {
      checkAnswer(Answers.correct);
    }

    if (target.closest('.btn-wrong')) {
      checkAnswer(Answers.wrong);
    }
  });
};

export default clickAnswerListener;
