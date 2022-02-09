import { PaletteBootstrap } from '../components/constants';
import renderNotification from '../components/Notification/renderNotification';

export default async (url: string, finallyCallback: () => void, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const textError = await res.text();
      throw new Error(textError);
    }
    return await res.json();
  } catch (e) {
    const errMessage = (e as Error).message;
    // if (errMessage === 'Access token is missing or invalid'){}
    renderNotification(errMessage, PaletteBootstrap.error);
  } finally {
    finallyCallback();
  }
  return false;
};
