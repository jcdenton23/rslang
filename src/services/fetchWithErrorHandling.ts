import { PaletteBootstrap } from '../components/constants';
import { IRequests } from '../components/interfaces';
import renderNotification from '../components/Notification/renderNotification';
import findErrorMessage from './utils';

export default async <T>(request: IRequests): Promise<T | undefined> => {
  const { url, finallyCallback, options = {}, showNotification } = request;
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const textError = await res.text();
      throw new Error(textError);
    }
    return await res.json();
  } catch (e) {
    const errMessage = (e as Error).message;
    // console.log(errMessage);
    // if (errMessage === 'Access token is missing or invalid'){}
    if (showNotification) {
      renderNotification(findErrorMessage(errMessage), PaletteBootstrap.error);
    }
  } finally {
    finallyCallback?.();
  }
  return undefined;
};
