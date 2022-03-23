import { IStatistics } from '../components/interfaces';

const statisticsStore: IStatistics = {
  learnedWords: 0,
  optional: {
    currentDate: new Date().toISOString().slice(0, 10),
    sprint: {
      maxInRow: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
    audioChallenge: {
      maxInRow: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
  },
};

export default statisticsStore;
