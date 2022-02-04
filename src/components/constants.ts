import { BackgroundBootstrap, TextColorBootstrap } from './enum';

const PaletteBootstrap = {
  error: { bg: BackgroundBootstrap.danger, text: TextColorBootstrap.white },
  warning: { bg: BackgroundBootstrap.warning, text: TextColorBootstrap.dark },
  success: { bg: BackgroundBootstrap.success, text: TextColorBootstrap.white },
};

export default PaletteBootstrap;
