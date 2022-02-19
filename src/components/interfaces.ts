import { Modal } from 'bootstrap';

export interface IRequests {
  url: string;
  finallyCallback?: () => void;
  options?: RequestInit;
  showNotification: boolean;
}

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
  isPageLearned: boolean;
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
  timerId: number;
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

export interface IRenderSprint {
  word: IWord;
  translateWord: IWord;
  renderSprintResult: ISprintResult;
  startTimer: IStartTimer;
}

export interface IRenderSprintGame {
  (options: IRenderSprint): HTMLElement;
}

export interface IModalStore {
  modal: Modal | null;
}

export interface IUserWordsStore {
  words: IResponseWordInfo[] | null;
  hardWords: IWord[];
}

export interface IOptionalWord {
  streak: number;
  correctAnswer: number;
  wrongAnswer: number;
  learned: boolean;
}

export interface IWordInfo {
  difficulty: string;
  optional: IOptionalWord;
}

export interface IResponseWordInfo extends IWordInfo {
  id: string;
  wordId: string;
}

export interface IAudioChallengeStore {
  words: IWord[];
  correctWords: IWord[];
  wrongWords: IWord[];
  questionNumber: number;
  currentPage: number;
  currentGroup: number;
  currentInRow: number;
  maxInRow: number;
  correctAnswers: number;
  wrongAnswers: number;
  numPressHandler: ((e: KeyboardEvent) => void) | null;
  spacePressHandler: ((e: KeyboardEvent) => void) | null;
  arrowRightPressHandler: ((e: KeyboardEvent) => void) | null;
}

export interface IrenderAudioChallengeGame {
  (word: IWord, optionsWords: IWord[]): HTMLElement;
}

export interface IAgregatedWord {
  _id: string;
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
  options: IWordInfo;
}

export interface ICount {
  count: number;
}
export interface IAgregatedResponse {
  paginatedResults: IAgregatedWord[];
  totalCount: ICount[];
}

export interface IloadHardwordCards {
  (finallyCallback: () => void, cardClassName: string): void;
}

export interface ICheckPageIsLearned {
  (page: number, group: number): void;
}

export interface IRenderCard {
  word: IWord;
  cardClassName: string;
  loadHardwordCards?: IloadHardwordCards;
  isHardCard?: boolean;
  checkIsPageLearned: ICheckPageIsLearned;
}
