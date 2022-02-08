import textbookStore from '../../../store/textbookStore';
import { BASE_LINK } from '../../../services/constants';
import renderCard from '../../../components/card';

const renderCards = () => {
  const cards = document.createElement('div');
  cards.classList.add('textbook__cards');
  const cardsElements = textbookStore.words.map((word) => renderCard(word, BASE_LINK));
  cards.append(...cardsElements);
  return cards;
};

export default renderCards;
