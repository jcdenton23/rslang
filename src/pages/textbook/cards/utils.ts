import renderCards from '.';
import { BorderBootstrap } from '../../../components/enum';
import { ICheckPageIsLearned, IloadHardwordCards } from '../../../components/interfaces';

interface IUpdateCards {
  cardClassName: string;
  loadHardwordCards?: IloadHardwordCards;
  isHardCard: boolean;
  checkIsPageLearned: ICheckPageIsLearned;
}

export const updateCards = (props: IUpdateCards) => {
  const { cardClassName, loadHardwordCards, isHardCard, checkIsPageLearned } = props;
  const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
  const cards = textbookWrapper.querySelector('.textbook__cards') as HTMLDivElement;
  cards.remove();
  const options = {
    cardClassName,
    loadHardwordCards,
    isHardCard,
    checkIsPageLearned,
  };
  textbookWrapper.appendChild(renderCards(options));
};

export const getCardClassName = (groupNumber: number) => {
  switch (groupNumber) {
    case 1:
      return BorderBootstrap.primary;
    case 2:
      return BorderBootstrap.info;
    case 3:
      return BorderBootstrap.warning;
    case 4:
      return BorderBootstrap.success;
    case 5:
      return BorderBootstrap.danger;
    case 6:
      return BorderBootstrap.secondary;
    default:
      return BorderBootstrap.primary;
  }
};
