import { GameInitators } from '../components/enum';
import { ISprintStore } from '../components/interfaces';

export default {
  words: [],
  translateWords: [],
  correctWords: [],
  wrongWords: [],
  questionNumber: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  currentInRow: 0,
  maxInRow: 0,
  currentPage: 29,
  currentGroup: 0,
  score: 0,
  time: 60,
  timerId: setTimeout(() => {}),
  gameInitiator: GameInitators.menu,
  btnPressHandler: null,
} as ISprintStore;
