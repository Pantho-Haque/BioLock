import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '768px',
  md: '960px',
  lg: '1200px',
  xl: '1920px',
});

export const dark = extendTheme({
  breakpoints: breakpoints,
  fonts: {
    heading: 'Open Sans',
    body: 'Inter, sans-serif',
  },
  colors: {
    ash: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    highlighter: {
      50: '#9AA7D7',
      100: '#ABB6DE',
      200: '#9AA7D7',
      300: '#7989C9',
      400: '#687BC3',
      500: '#576CBC',
      600: '#465696',
      700: '#3D4C84',
      800: '#2C365E',
      900: '#232B4B',
    },
    pitchBlack: {
      50: '#BFBFC4',
      100: '#94959D',
      200: '#696A75',
      300: '#535561',
      400: '#3E3F4E',
      500: '#282A3A',
      600: '#242634',
      700: '#20222E',
      800: '#1C1D29',
      900: '#181923',
    },
    text: {
      lighter: '#EAEAEB',
      light: '#BFBFC4',
      mid: '#94959D',
      dark: '#696A75',
    },
    bg: {
      lighter: '#3E3F4E',
      light: '#282A3A',
      mid: '#242634',
      dark: '#20222E',
      darker:"#181923"
    },
  },
});
