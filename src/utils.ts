import sprintStore from './store/sprintStore';

export const clearAndGetElement = (selector: string) => {
  const element = document.querySelector(selector) as HTMLDivElement;
  element.innerHTML = '';
  return element;
};

export const shuffleArray = (array: []) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
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
