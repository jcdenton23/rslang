import { IrenderAudioChallengeGame } from '../../../components/interfaces';
import audioChallengeStore from '../../../store/audioChallengeStore';
import { removeListeners } from '../../../utils';
import renderResult from '../../results/renderResult';
import tryAgainBtnListener from './createTryAgainBtnListener';

const renderAudioChallengeResults = (renderAudioChallengeGame: IrenderAudioChallengeGame) => {
  const results = document.createElement('div');
  results.classList.add('results');
  results.innerHTML = `
        <h3 class="title title--fz36">Results</h3>
        <div class="results__wrapper card">
            <button type="button" class="btn btn-again btn-primary">Try again</button>
            <div class="results__correct">
                <i class="fas fa-check"></i>
                <span>Correct answers: ${audioChallengeStore.correctAnswers}</span>
            </div>
            <div class="results__wrong">
                <i class="fas fa-times"></i>
                <span>Wrong answers: ${audioChallengeStore.wrongAnswers}</span>
            </div>
            <div class="results__row">
                <i class="fas fa-arrow-alt-right"></i>
                <span>In a row: ${audioChallengeStore.maxInRow}</span>
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

  const correctAnswers = audioChallengeStore.correctWords.map((w) => renderResult(w));
  const wrongAnswers = audioChallengeStore.wrongWords.map((w) => renderResult(w));
  correctResults.append(...correctAnswers);
  wrongResults.append(...wrongAnswers);

  tryAgainBtnListener(results, renderAudioChallengeGame);

  return results;
};

export default renderAudioChallengeResults;
