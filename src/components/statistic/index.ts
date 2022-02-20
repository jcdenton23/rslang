import statisticsStore from '../../store/statisticsStore';
import userWordsStore from '../../store/userWordsStore';
import { BackgroundBootstrap, LearnedIn } from '../enum';

export default function getStatisticsPageElement() {
  const page = document.createElement('div');
  page.classList.add('statistics-page');
  const { sprint, audioChallenge } = statisticsStore.optional;

  const percentCorrectWordsSprint = Math.round(
    (sprint.correctAnswers / (sprint.correctAnswers + sprint.wrongAnswers)) * 100 || 0,
  );
  // eslint-disable-next-line operator-linebreak
  const percentCorrectWordsAudioChallenge =
    // eslint-disable-next-line operator-linebreak
    Math.round((audioChallenge.correctAnswers / (audioChallenge.correctAnswers + audioChallenge.wrongAnswers)) * 100) ||
    0;

  const percentCorrectWordsPerDay = Math.round((percentCorrectWordsSprint + percentCorrectWordsAudioChallenge) / 2);

  const newWords = userWordsStore.words?.filter(
    (word) => word.optional.firstEncounter === new Date().toISOString().slice(0, 10),
  ).length;

  const countNewWordsAudio = userWordsStore.words?.filter((word) => {
    const isToday = word.optional.firstEncounter === new Date().toISOString().slice(0, 10);
    const isEncounterAudio = word.optional.encounterIn === LearnedIn.audio;
    return isToday && isEncounterAudio;
  }).length;

  const countNewWordsSprint = userWordsStore.words?.filter((word) => {
    const isToday = word.optional.firstEncounter === new Date().toISOString().slice(0, 10);
    const isEncounterSprint = word.optional.encounterIn === LearnedIn.sprint;
    return isToday && isEncounterSprint;
  }).length;

  page.innerHTML = `
    <section class="statistics">
    <div class="container">
        <div class="statistics__content">
       


<div class="statistics__games d-flex flex-column align-items-center gap-3">

<h3>Today</h3>

<div class="card w-50 shadow-lg p-3">

      <h3>Words</h3>
     
      <div class="progress">
        <div 
        class="progress-bar progress-bar-striped progress-bar-animated ${BackgroundBootstrap.success}" 
        role="progressbar" 
        title="Correct Answers"
        style="width: ${percentCorrectWordsPerDay}%">
        ${percentCorrectWordsPerDay}%
        </div>
        <div class="progress-bar progress-bar-striped progress-bar-animated  ${BackgroundBootstrap.danger}" 
        role="progressbar" 
        title="Wrong Answers"
        style="width: ${100 - percentCorrectWordsPerDay}%">
        ${100 - percentCorrectWordsPerDay}%
        </div>
      </div>
      <p><i class="fas fa-check"></i> ${statisticsStore.learnedWords} words were learned</p>
      <p><i class="fas fa-fire"></i> ${newWords} new words</p>
      <p><i class="fas fa-bullseye"></i> ${percentCorrectWordsSprint}% accuracy</p>
    </div>

    <div class="card w-50 shadow-lg p-3">
      <h3>Sprint</h3>
      
      <div class="progress">
        <div 
        class="progress-bar progress-bar-striped progress-bar-animated ${BackgroundBootstrap.success}" 
        role="progressbar" 
        title="Correct Answers"
        style="width: ${percentCorrectWordsSprint}%">
        ${percentCorrectWordsSprint}%
        </div>
        <div class="progress-bar progress-bar-striped progress-bar-animated  ${BackgroundBootstrap.danger}" 
        role="progressbar" 
        title="Wrong Answers"
        style="width: ${100 - percentCorrectWordsSprint}%">
        ${100 - percentCorrectWordsSprint}%
        </div>
      </div>
      
      <p><i class="fas fa-fire"></i> ${countNewWordsSprint} new words</p>
      <p><i class="fas fa-bullseye"></i> ${percentCorrectWordsSprint}% accuracy</p>
      <p><i class="fas fa-arrow-alt-right"></i> ${sprint.maxInRow} in a row</p>
    </div>
  
    <div class="card w-50 shadow-lg p-3 ">
      <h3>Audio challenge</h3>
      
      <div class="progress">
        <div 
        class="progress-bar progress-bar-striped progress-bar-animated ${BackgroundBootstrap.success}" 
        role="progressbar" 
        title="Correct Answers"
        style="width: ${percentCorrectWordsAudioChallenge}%">
        ${percentCorrectWordsAudioChallenge}%
        </div>
        <div class="progress-bar progress-bar-striped progress-bar-animated  ${BackgroundBootstrap.danger}" 
        role="progressbar" 
        title="Wrong Answers"
        style="width: ${100 - percentCorrectWordsAudioChallenge}%">
        ${100 - percentCorrectWordsAudioChallenge}%
        </div>
      </div>
      
      <p><i class="fas fa-fire"></i> ${countNewWordsAudio} new words</p>
      <p><i class="fas fa-bullseye"></i> ${percentCorrectWordsAudioChallenge}% accuracy</p>
      <p><i class="fas fa-arrow-alt-right"></i> ${audioChallenge.maxInRow} in a row</p>
    </div>
</div>

        </div>
    </div>
    </section>
    `;

  return page;
}
