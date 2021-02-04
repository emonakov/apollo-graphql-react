import 'styled-components';

import theme from '../config/theme';

type LocalTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends LocalTheme {} // eslint-disable-line
}
