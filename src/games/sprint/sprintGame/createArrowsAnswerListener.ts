import { Answers, Keys } from '../../../components/enum';
import sprintStore from '../../../store/sprintStore';
import sprintAnswerHandler from '../answers/createAnswerHandler';
import { IAnswer } from './createClickAnswerListener';

const arrowsAnswerListener = (props: IAnswer) => {
  const { word, translateWord, renderSprintGame, renderSprintResult, startTimer, router } = props;

  const checkAnswer = (answer: Answers) => {
    sprintAnswerHandler({
      word,
      translateWord,
      renderSprintGame,
      renderSprintResult,
      startTimer,
      type: answer,
      router,
    });
  };

  if (sprintStore.btnPressHandler) {
    document.removeEventListener('keydown', sprintStore.btnPressHandler);
  }

  sprintStore.btnPressHandler = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    if (e.key === Keys.ArrowLeft) {
      checkAnswer(Answers.correct);
    }
    if (e.key === Keys.ArrowRight) {
      checkAnswer(Answers.wrong);
    }
  };

  document.addEventListener('keydown', sprintStore.btnPressHandler);
};

export default arrowsAnswerListener;
