import sprintStore from './store/sprintStore';

export const clearAndGetElement = (selector: string) => {
  const element = document.querySelector(selector) as HTMLDivElement;
  element.innerHTML = '';
  return element;
};

export const shuffleArray = (array: []) => {
  const newArray = array.slice();
  newArray.sort(() => Math.random() - 0.5);
  return newArray;
};

export const getRandomNum = (min: number, max: number) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

export const removeListeners = () => {
  clearInterval(sprintStore.timerId);
  if (sprintStore.btnPressHandler) {
    document.removeEventListener('keydown', sprintStore.btnPressHandler);
  }
};
