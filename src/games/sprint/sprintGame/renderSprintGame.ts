import { IRenderSprint } from '../../../components/interfaces';
import sprintStore from '../../../store/sprintStore';
import arrowsAnswerListener from './createArrowsAnswerListener';
import clickAnswerListener from './createClickAnswerListener';

const renderSprintGame = (props: IRenderSprint) => {
  const { word, translateWord, renderSprintResult, startTimer } = props;
  const sprint = document.createElement('div');
  sprint.classList.add('sprint');
  sprint.innerHTML = `
    <h3 class="title title--fz20">Score: ${sprintStore.score}</h3>
        <h4 class="title title--fz20">+10 points</h4>
         <div class="sprint__item card">
         <p class="sprint__item-word">${word.word}</p>
        <p class="sprint__item-translate">${translateWord.wordTranslate}</p>
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
  };

  clickAnswerListener(sprint, options);
  arrowsAnswerListener(options);

  return sprint;
};
export default renderSprintGame;
