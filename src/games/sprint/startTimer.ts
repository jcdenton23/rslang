import { IRouter } from '../../router/types';
import sprintStore from '../../store/sprintStore';
import { clearAndGetElement } from '../../utils';
import { TIMER_NINE, TIMER_ZERO } from './constants';
import renderSprintResult from './results/renderSprintResult';

const startTimer = (time: number, selector: string, router: IRouter) => {
  const timerEl = document.querySelector(selector) as HTMLDivElement;
  let currentTime = time;
  function timer() {
    timerEl.textContent = String(currentTime);
    currentTime -= 1;
    if (currentTime < TIMER_NINE) {
      const addZero = timerEl.textContent;
      timerEl.textContent = `0${addZero}`;
    }
    if (currentTime < TIMER_ZERO) {
      clearInterval(sprintStore.timerId);
      timerEl.remove();
      const gamesContent = clearAndGetElement('.games__content') as HTMLDivElement;
      gamesContent.append(renderSprintResult(startTimer, router));
    }
  }
  sprintStore.timerId = window.setInterval(timer, 1000);
};

export default startTimer;
