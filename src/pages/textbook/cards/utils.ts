import renderCards from '.';

export const updateCards = () => {
  const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
  const cards = textbookWrapper.querySelector('.textbook__cards') as HTMLDivElement;
  cards.remove();
  textbookWrapper.appendChild(renderCards());
};

export const clearAndGetCards = () => {
  const cards = document.querySelector('.textbook__cards') as HTMLDivElement;
  cards.innerHTML = '';
  return cards;
};
