import { Modal } from 'bootstrap';
import { BackgroundBootstrap, TextColorBootstrap } from './enum';

export const PaletteBootstrap = {
  error: { bg: BackgroundBootstrap.danger, text: TextColorBootstrap.white },
  warning: { bg: BackgroundBootstrap.warning, text: TextColorBootstrap.dark },
  success: { bg: BackgroundBootstrap.success, text: TextColorBootstrap.white },
};

export const modals: Modal[] = [];

// export default PaletteBootstrap;
