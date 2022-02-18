import textbookStore from '../../../store/textbookStore';
import renderCard from '../../../components/card';
import { getAllUserWords } from '../../../components/words/utils';

const renderCards = (cardClassName: string) => {
  getAllUserWords();
  const cards = document.createElement('div');
  cards.classList.add('textbook__cards');
  const cardsElements = textbookStore.words.map((word) => renderCard(word, cardClassName));
  cards.append(...cardsElements);
  return cards;
};

export default renderCards;
