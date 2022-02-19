import { Filters } from '../../../components/enum';
import { IAgregatedResponse, IRequests } from '../../../components/interfaces';
import { getAllUserWords, getLearnedAndHardWords } from '../../../components/words/utils';
import { BASE_LINK } from '../../../services/constants';
import fetchWithErrorHandling from '../../../services/fetchWithErrorHandling';
import authStore from '../../../store/authStore';
import textbookStore from '../../../store/textbookStore';
import userWordsStore from '../../../store/userWordsStore';
import { updateCards } from '../cards/utils';

export const learnedPageHandler = () => {
  const textbookWrapper = document.querySelector('.textbook__wrapper') as HTMLDivElement;
  const audioGameBtn = textbookWrapper.querySelector('.btn-audio') as HTMLButtonElement;
  const sprintGameBtn = textbookWrapper.querySelector('.btn-sprint') as HTMLButtonElement;
  if (textbookStore.isPageLearned) {
    textbookWrapper.classList.add('bg-learned-page');
    sprintGameBtn.disabled = true;
    audioGameBtn.disabled = true;
  } else {
    textbookWrapper.classList.remove('bg-learned-page');
    sprintGameBtn.disabled = false;
    audioGameBtn.disabled = false;
  }
};

export const checkIsPageLearned = async (page: number, group: number) => {
  const hardAndLearnedWords = await getLearnedAndHardWords(page, group);
  textbookStore.isPageLearned = hardAndLearnedWords?.[0].totalCount[0]?.count === 20;
  learnedPageHandler();
};

export const loadHardwordCards = async (finallyCallback: () => void, cardClassName: string) => {
  const url = `${BASE_LINK}users/${authStore.userId}/aggregatedWords?filter=${Filters.hard}`;
  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const request: IRequests = {
    url,
    options: { headers },
    finallyCallback,
    showNotification: false,
  };
  const res = await fetchWithErrorHandling<IAgregatedResponse[]>(request);
  if (res) {
    await getAllUserWords();
    const words = res[0].paginatedResults;
    userWordsStore.hardWords = words.map((w) => ({
      ...w,
      // eslint-disable-next-line no-underscore-dangle
      id: w._id,
    }));
    const options = {
      cardClassName,
      loadHardwordCards,
      isHardCard: true,
      checkIsPageLearned,
    };

    updateCards(options);
  }
};
