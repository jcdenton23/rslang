export enum BackgroundBoodstrap {
  primary = 'bg-primary',
  secondary = 'bg-secondary',
  success = 'bg-success',
  danger = 'bg-danger',
  warning = 'bg-warning',
  info = 'bg-info',
  light = 'bg-light',
  dark = 'bg-dark',
  body = 'bg-body',
  white = 'bg-white',
  transparent = 'bg-transparent',
}

export enum TextColorBoodstrap {
  primary = 'text-primary',
  secondary = 'text-secondary',
  success = 'text-success',
  danger = 'text-danger',
  warning = 'text-warning',
  info = 'text-info',
  light = 'text-light',
  dark = 'text-dark',
  body = 'text-body',
  muted = 'text-muted',
  white = 'text-white',
  blackOpacity = 'text-black-50',
  whiteOpacity = 'text-white-50',
}

export const PaletteBootstrap = {
  error: { bg: BackgroundBoodstrap.danger, text: TextColorBoodstrap.white },
  warning: { bg: BackgroundBoodstrap.warning, text: TextColorBoodstrap.dark },
  success: { bg: BackgroundBoodstrap.success, text: TextColorBoodstrap.white },
};
