import { BASE_LINK } from '../../services/constants';
import fetchWithErrorHandling from '../../services/fetchWithErrorHandling';
import authStore from '../../store/authStore';
import userWordsStore from '../../store/userWordsStore';
import { IResponseWordInfo } from '../interfaces';

export default async function getAllUserWords() {
  const url = `${BASE_LINK}users/${authStore.userId}/words`;

  const headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Bearer ${authStore.token}` });

  const request = {
    url,
    options: { headers },
    showNotification: false,
  };

  const response = await fetchWithErrorHandling<IResponseWordInfo[]>(request);

  userWordsStore.words = response || [];
}
