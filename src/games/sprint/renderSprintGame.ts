import { ISprintResult, IStartTimer, IWord } from '../../components/interfaces';
import sprintStore from '../../store/sprintStore';
import sprintAnswerHandler from './createAnswerHandler';
import { Answers, Arrows } from '../../components/enum';

const renderSprintGame = (
  word: IWord,
  translateWord: IWord,
  renderSprintResult: ISprintResult,
  startTimer: IStartTimer,
) => {
  const sprint = document.createElement('div');
  sprint.classList.add('sprint');
  sprint.innerHTML = `
    <h3 class="title title--fz20">Score: ${sprintStore.score}</h3>
        <h4 class="title title--fz20">+10 points</h4>
         <div class="sprint-item card">
         <p class="sprint-item-word">${word.word}</p>
        <p class="sprint-item-translate">${translateWord.wordTranslate}</p>
        <div class="sprint-item-btns">
        <button type="button" class="btn btn-correct btn-success"><i class="fas fa-arrow-left"></i> Correct</button>
        <button type="button" class="btn btn-wrong btn-danger">Wrong <i class="fas fa-arrow-right"></i></button>
     </div>
     </div>
    `;

  const options = {
    word,
    translateWord,
    renderSprintGame,
    renderSprintResult,
    startTimer,
    type: Answers.correct,
  };

  const btnsWrapper = sprint.querySelector('.sprint-item-btns') as HTMLDivElement;
  btnsWrapper.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;

    if (target.closest('.btn-correct')) {
      sprintAnswerHandler(options);
    }
    if (target.closest('.btn-wrong')) {
      options.type = Answers.wrong;
      sprintAnswerHandler(options);
    }
  });

  if (sprintStore.btnPressHandler) {
    document.removeEventListener('keydown', sprintStore.btnPressHandler);
  }

  sprintStore.btnPressHandler = (e: KeyboardEvent) => {
    if (e.repeat) {
      return;
    }
    if (e.key === Arrows.left) {
      sprintAnswerHandler(options);
    }
    if (e.key === Arrows.right) {
      options.type = Answers.wrong;
      sprintAnswerHandler(options);
    }
  };

  document.addEventListener('keydown', sprintStore.btnPressHandler);

  return sprint;
};
export default renderSprintGame;
