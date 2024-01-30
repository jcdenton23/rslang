import sprintStore from '../../store/sprintStore';

const renderTimer = (timerValue = sprintStore.time) => {
  const timer = document.createElement('div');
  timer.classList.add('timer');
  timer.innerHTML = String(timerValue);
  return timer;
};

export default renderTimer;
