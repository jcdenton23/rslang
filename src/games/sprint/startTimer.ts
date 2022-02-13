import sprintStore from '../../store/sprintStore';
import { clearAndGetElement } from '../../utils';
import renderSprintResult from './renderSprintResult';

const startTimer = (time: number, selector: string) => {
  const timerEl = document.querySelector(selector) as HTMLDivElement;
  let t = time;
  function timer() {
    timerEl.textContent = String(t);
    t -= 1;
    if (t < 9) {
      const addZero = timerEl.textContent;
      timerEl.textContent = `0${addZero}`;
    }
    if (t < 0) {
      clearInterval(sprintStore.timerId);
      timerEl.textContent = 'Time Off';
      timerEl.remove();
      const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
      gamesContent.append(renderSprintResult(startTimer));
    }
  }
  sprintStore.timerId = setInterval(timer, 1000);
};

export default startTimer;
