import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { colors } from './colors';

const theme = {
  mainFont: 'Julius Sans One',
  contentPadding: '20px',
  paddingSm: '5px',
  paddingMdOffsetSm: '10px',
  paddingMd: '15px',
  menuBorderHeight: '10px',
  menuBorderStyle: '1px solid',
  frameBackground: colors.frameBackground,
  textColor: colors.textColor,
  frameBorderColor: colors.frameBorderColor,
  linkHoverColor: colors.linkHoverColor,
  frameBorderHoverColor: colors.frameBorderHoverColor,
  menuBorderColor: colors.menuBorderColor,
  darkBorderColor: colors.darkBorder,
  galleryThumbWidth: '140px',
  buttonColor: colors.buttonColor,
  wrapperBackground: colors.wrapperBackground,
};

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.wrapperBackground,
    },
    secondary: {
      main: colors.frameBackground,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colors.menuBorderColor,
    },
  },
});

export default theme;
