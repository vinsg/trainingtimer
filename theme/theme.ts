import { DefaultTheme } from 'styled-components/native';

// Extend default theme prop types for autocomplete inside app.
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      lightBlue: string;
      darkBlue: string;

      lightGreen: string;
      darkGreen: string;

      lightRed: string;
      darkRed: string;

      lightYellow: string;
      darkYellow: string;

      white: string;
      coolGrey: string;
      lightGrey: string;
      darkGrey: string;
    };
    textColors: {
      primaryText: string;
      secondaryText: string;
    };
    spaces: {
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
    };
    fontSize: {
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    };
  }
}

const colors = {
  lightBlue: '#BFDBFE',
  darkBlue: '#1E40AF',

  lightGreen: '#A7F3D0',
  darkGreen: '#065F46',

  lightRed: '#FECACA',
  darkRed: '#991B1B',

  lightYellow: '#FEF3C7',
  darkYellow: '#92400E',

  white: '#FFFFFF',
  coolGrey: '#F9FAFB',
  lightGrey: 'rgba(255, 255, 255, 0.1)',
  darkGrey: '#1F2937',
};

const textColors = {
  primaryText: colors.coolGrey,
  secondaryText: '#292524',
};

const spaces = {
  0: '4px',
  1: '8px',
  2: '12px',
  3: '16px',
  4: '24px',
  5: '32px',
  6: '48px',
};

const fontSize = {
  small: '18px',
  medium: '24px',
  large: '28px',
  xLarge: '42px',
};

/*
Export default theme to use in app.
*/
export const lightTheme: DefaultTheme = {
  colors,
  textColors,
  spaces,
  fontSize,
};
