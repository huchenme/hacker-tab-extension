import { mix } from 'polished';

const darkBaseColor = '#121212';

const dark = (level = 0, color = '#fff') =>
  mix(level / 100, color, darkBaseColor);

const baseTheme = {
  transition: '.2s cubic-bezier(0.4, 0, 0.2, 1)',
};

export const themeLight = {
  ...baseTheme,
  isDark: false,
  bg: '#eee',
  text: {
    active: 'rgba(0, 0, 0, 0.87)',
    helper: 'rgba(0, 0, 0, 0.60)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  rgba: opacity => `rgba(0, 0, 0, ${opacity})`,
  topBar: {
    bg: '#fff',
  },
  card: {
    bg: '#fff',
    bgHover: 'rgba(0, 0, 0, 0.04)',
    title: 'rgba(0, 0, 0, 0.87)',
    currentStar: 'rgba(0, 0, 0, 0.20)',
    additional: '#586069',
    divider: '#e8e8e8',
    border: 'transparent',
  },
  icon: {
    color: '#aaa',
    hoverColor: '#777',
  },
  error: {
    bg: '#ffa000',
  },
  footer: {
    text: '#aaa',
    link: '#aaa',
    linkHover: '#777',
    email: '#1976D2',
    heart: '#F44336',
  },
  select: {
    bg: '#EBECF0',
    bgHover: '#EBECF0',
    text: 'rgba(0, 0, 0, 0.87)',
    label: 'rgba(0, 0, 0, 0.60)',
    indicator: 'rgba(0, 0, 0, 0.60)',
    indicatorHover: 'rgba(0, 0, 0, 0.87)',
    menu: '#fff',
    menuFocus: '#EEEEEE',
    menuSelected: '#DFE0DF',
  },
  loader: {
    stop1: 'rgba(0,0,0,0.03)',
    stop2: 'rgba(0,0,0,0.07)',
    stop3: 'rgba(0,0,0,0.03)',
    fallback: '#f6f7f8',
  },
  emptyState: {
    bg: '#fafbfc',
    border: '#e1e4e8',
    icon: '#a3aab1',
    title: 'rgba(0, 0, 0, 0.87)',
    text: 'rgba(0, 0, 0, 0.60)',
  },
};

export const themeDark = {
  ...baseTheme,
  isDark: true,
  bg: dark(0),
  text: {
    active: 'rgba(255, 255, 255, 0.87)',
    helper: 'rgba(255, 255, 255, 0.60)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  rgba: opacity => `rgba(255, 255, 255, ${opacity})`,
  topBar: {
    bg: dark(9),
  },
  card: {
    bg: dark(5),
    bgHover: dark(9),
    title: '#fff',
    currentStar: 'rgba(255, 255, 255, 0.38)',
    additional: 'rgba(255, 255, 255, 0.87)',
    divider: dark(12),
    border: dark(12),
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.38)',
    hoverColor: 'rgba(255, 255, 255, 0.87)',
  },
  error: {
    bg: dark(24, '#ffa000'),
  },
  footer: {
    text: 'rgba(255, 255, 255, 0.87)',
    link: 'rgba(255, 255, 255, 0.60)',
    linkHover: '#fff',
    email: '#90CAF9',
    heart: '#EF9A9A',
  },
  select: {
    bg: 'rgba(255, 255, 255, 0.05)',
    bgHover: 'rgba(255, 255, 255, 0.12)',
    text: 'rgba(255, 255, 255, 0.87)',
    label: 'rgba(255, 255, 255, 0.38)',
    indicator: 'rgba(255, 255, 255, 0.60)',
    indicatorHover: 'rgba(255, 255, 255, 0.87)',
    menu: '#424242',
    menuFocus: '#585858',
    menuSelected: '#6C6C6C',
  },
  loader: {
    stop1: 'rgba(255,255,255,0.03)',
    stop2: 'rgba(255,255,255,0.07)',
    stop3: 'rgba(255,255,255,0.03)',
    fallback: dark(14),
  },
  emptyState: {
    bg: dark(5),
    border: 'transparent',
    icon: 'rgba(255, 255, 255, 0.60)',
    title: 'rgba(255, 255, 255, 0.87)',
    text: 'rgba(255, 255, 255, 0.60)',
  },
};
