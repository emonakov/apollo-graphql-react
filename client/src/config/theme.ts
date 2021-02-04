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
  galleryThumbWidth: '140px',
  colors,
};

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.textColor,
    },
    secondary: {
      main: colors.linkHoverColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colors.wrapperBackground,
    },
  },
});

export default theme;
