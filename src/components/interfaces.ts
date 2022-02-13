import { Modal } from 'bootstrap';

export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IAuth {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  [key: string]: string;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export interface ITextbookStore {
  words: IWord[];
  textbookPage: number;
  textbookGroup: number;
  cardClassName: string;
}

export interface ISprintStore {
  words: IWord[];
  translateWords: IWord[];
  correctWords: IWord[];
  wrongWords: IWord[];
  questionNumber: number;
  correctAnswers: number;
  wrongAnswers: number;
  currentInRow: number;
  maxInRow: number;
  currentPage: number;
  currentGroup: number;
  score: number;
  time: number;
  timerId: ReturnType<typeof setTimeout>;
  gameInitiator: string;
  btnPressHandler: ((e: KeyboardEvent) => void) | null;
}

export interface IStartTimer {
  (time: number, selector: string): void;
}

export interface IGamesStartPage {
  (): HTMLElement;
}

export interface ISprintResult {
  (a: IStartTimer): HTMLElement;
}

export interface IRenderSprintGame {
  (w1: IWord, w2: IWord, renderSprintResult: ISprintResult, startTimer: IStartTimer): HTMLElement;
}
export interface IModalStore {
  modal: Modal | null;
}
