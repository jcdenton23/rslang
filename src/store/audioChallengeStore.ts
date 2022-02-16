import { IAudioChallengeStore } from '../components/interfaces';

export default {
  words: [],
  correctWords: [],
  wrongWords: [],
  questionNumber: 0,
  currentPage: 0,
  currentGroup: 0,
  currentInRow: 0,
  maxInRow: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  numPressHandler: null,
  spacePressHandler: null,
  arrowRightPressHandler: null,
} as IAudioChallengeStore;
