import renderNotification from '../components/Notification/renderNotification';
import PaletteBootstrap from '../components/constants';

export default async (url: string, finallyCallback: () => void, options = {}) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Something went wrong!');
    }
    return await res.json();
  } catch (e) {
    renderNotification((e as Error).message, PaletteBootstrap.error);
  } finally {
    finallyCallback();
  }
  return false;
};
