import { PaletteBootstrap } from '../components/constants';
import { IRequests } from '../components/interfaces';
import renderNotification from '../components/Notification/renderNotification';
import authStore from '../store/authStore';
import { BASE_LINK } from './constants';
import findErrorMessage from './utils';

interface IRetoken {
  token: string;
  refreshToken: string;
}

export default async <T>(request: IRequests): Promise<T | undefined> => {
  const { url, finallyCallback, options = {}, showNotification } = request;
  try {
    const res = await fetch(url, options);

    if (res.status === 401 || res.status === 402) {
      const headersForRetoken = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.refreshToken}`,
      });
      const retoken: IRetoken = await (
        await fetch(`${BASE_LINK}users/${authStore.userId}/tokens`, { headers: headersForRetoken })
      ).json();

      authStore.token = retoken.token;
      authStore.refreshToken = retoken.refreshToken;
      localStorage.setItem('auth', JSON.stringify(authStore));

      const newHeaders = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      });
      options.headers = newHeaders;
      const newRes = await fetch(url, options);

      if (!newRes.ok) {
        const textError = await newRes.text();
        throw new Error(textError);
      }

      return await newRes.json();
    }

    if (!res.ok) {
      const textError = await res.text();
      throw new Error(textError);
    }
    return await res.json();
  } catch (e) {
    const errMessage = (e as Error).message;
    if (showNotification) {
      renderNotification(findErrorMessage(errMessage), PaletteBootstrap.error);
    }
  } finally {
    finallyCallback?.();
  }
  return undefined;
};
