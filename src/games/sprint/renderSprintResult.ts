import renderSprintGame from './renderSprintGame';
import { IStartTimer } from '../../components/interfaces';
import { BASE_LINK } from '../../services/constants';
import sprintStore from '../../store/sprintStore';
import { loadSprintGame, resetSprintStore } from './utils';
import { GameInitators } from '../../components/enum';
import textbookStore from '../../store/textbookStore';
import renderAnswer from './renderAnswer';
import { removeListeners } from '../../utils';

const renderSprintResult = (startTimer: IStartTimer) => {
  const results = document.createElement('div');
  results.classList.add('results');
  results.innerHTML = `
        <h3 class="title title--fz36">Results</h3>
        <div class="results__wrapper card">
            <p class="results__score">Your score is: ${sprintStore.score}</p>
            <button type="button" class="btn btn-again btn-primary">Try again</button>
            <div class="results__correct">
                <i class="fas fa-check"></i>
                <span>Correct answers: ${sprintStore.correctAnswers}</span>
            </div>
            <div class="results__wrong">
                <i class="fas fa-times"></i>
                <span>Wrong answers: ${sprintStore.wrongAnswers}</span>
            </div>
            <div class="results__row">
                <i class="fas fa-arrow-alt-right"></i>
                <span>In a row: ${sprintStore.maxInRow}</span>
            </div>
            <div class="results__correct-words">
                <h4>Correct answers:</h4>
            </div>
            <div class="results__wrong-words">
                <h4>Wrong answers:</h4>
            </div>
        </div>
  `;

  removeListeners();
  const correctResults = results.querySelector('.results__correct-words') as HTMLDivElement;
  const wrongResults = results.querySelector('.results__wrong-words') as HTMLDivElement;

  const correctAnswers = sprintStore.correctWords.map((w) => renderAnswer(w));
  const wrongAnswers = sprintStore.wrongWords.map((w) => renderAnswer(w));
  correctResults.append(...correctAnswers);
  wrongResults.append(...wrongAnswers);

  const tryAgainBtn = results.querySelector('.btn-again') as HTMLButtonElement;

  tryAgainBtn.addEventListener('click', async () => {
    resetSprintStore();
    if (sprintStore.gameInitiator === GameInitators.textbook) {
      sprintStore.currentPage = textbookStore.textbookPage;
      sprintStore.currentGroup = textbookStore.textbookGroup;
    }
    const { currentPage, currentGroup } = sprintStore;
    const url = `${BASE_LINK}words?group=${currentGroup}&page=${currentPage}`;

    const options = {
      url,
      renderSprintGame,
      renderSprintResult,
      startTimer,
    };

    loadSprintGame(options);
  });
  return results;
};

export default renderSprintResult;
