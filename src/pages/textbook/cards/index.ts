import textbookStore from '../../../store/textbookStore';
import renderCard from '../../../components/card';
import userWordsStore from '../../../store/userWordsStore';
import { IRenderCards } from '../../../components/interfaces';

const renderCards = (props: IRenderCards) => {
  const { cardClassName, loadHardwordCards, isHardCard, checkIsPageLearned } = props;
  const cards = document.createElement('div');
  cards.classList.add('textbook__cards');

  let cardsElements = textbookStore.words.map((word) => renderCard({ word, cardClassName, checkIsPageLearned }));
  if (isHardCard) {
    cardsElements = userWordsStore.hardWords.map((word) => {
      const options = {
        word,
        cardClassName,
        loadHardwordCards,
        checkIsPageLearned,
        isHardCard,
      };
      return renderCard(options);
    });
  }
  cards.append(...cardsElements);
  return cards;
};

export default renderCards;
