import { PaletteBootstrap } from '../components/constants';
import renderNotification from '../components/Notification/renderNotification';
import { arrErrorMessages } from './constants';

function findErrorMessage(errMessage: string) {
  const resultFind = arrErrorMessages.filter((message) => errMessage.includes(message[0]));
  return resultFind.length ? resultFind[0][1] : errMessage;
}

export default async (url: string, finallyCallback: () => void, options: RequestInit = {}) => {
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
    renderNotification(findErrorMessage(errMessage), PaletteBootstrap.error);
  } finally {
    finallyCallback();
  }
  return false;
};
