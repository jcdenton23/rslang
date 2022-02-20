import statisticsStore from '../../store/statisticsStore';

export default function getStatisticsPageElement() {
  const page = document.createElement('div');
  page.classList.add('statistics-page');
  const { sprint, audioChallenge } = statisticsStore.optional;

  const percentCorrectWordsSprint = Math.round(
    (sprint.correctAnswers / (sprint.correctAnswers + sprint.wrongAnswers)) * 100,
  );
  const percentCorrectWordsAudioChallenge = Math.round(
    (audioChallenge.correctAnswers / (audioChallenge.correctAnswers + audioChallenge.wrongAnswers)) * 100,
  );

  page.innerHTML = `
    <section class="statistics">
    <div class="container">
        <div class="statistics__content">
       <p> ${statisticsStore.learnedWords} words were learned</p>


Sprint

<p>${sprint.newWords} words</p>
<p>${percentCorrectWordsSprint || '0'}% accuracy</p>
<p>${sprint.maxInRow} in a row</p>

Audio challenge

<p>${audioChallenge.newWords} words</p>
<p>${percentCorrectWordsAudioChallenge || '0'}% accuracy</p>
<p>${audioChallenge.maxInRow} in a row</p>


        </div>
    </div>
    </section>
    `;

  return page;
}
