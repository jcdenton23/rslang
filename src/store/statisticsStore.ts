import { IStatistics } from '../components/interfaces';

const statisticsStore: IStatistics = {
  learnedWords: 0,
  optional: {
    currentDate: new Date().toISOString().slice(0, 10),
    sprint: {
      newWords: 0,
      maxInRow: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
    audioChallenge: {
      newWords: 0,
      maxInRow: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    },
  },
};

export default statisticsStore;

// export interface IGamesResult {
//   newWords: number;
//   maxInRow: number;
//   correctAnswers: number;
//   wrongAnswers: number;
// }

// export interface IStatistics {
//   learnedWords: number;
//   optional: {
//     currentDate: Date;
//     sprint: IGamesResult;
//     audioChallenge: IGamesResult;
//   };
// }
