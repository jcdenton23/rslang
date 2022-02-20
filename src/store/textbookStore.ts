import { ITextbookStore } from '../components/interfaces';
import { BorderBootstrap } from '../components/enum';

export default {
  words: [],
  textbookPage: 0,
  textbookGroup: 0,
  cardClassName: BorderBootstrap.primary,
  isPageLearned: false,
} as ITextbookStore;
