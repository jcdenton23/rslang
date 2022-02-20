import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import userWordsStore from '../../store/userWordsStore';
import { IResponseWordInfo } from '../interfaces';
import { getHeaderForUser } from '../utils';

export default async function getAllUserWords() {
  const url = `${BASE_LINK}users/${authStore.userId}/words`;

  const headers = getHeaderForUser();

  const request = {
    url,
    options: { headers },
    showNotification: false,
  };

  const response = await fetchWithErrorHandling<IResponseWordInfo[]>(request);

  userWordsStore.words = response || [];
}
