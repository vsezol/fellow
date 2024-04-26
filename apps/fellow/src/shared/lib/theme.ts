import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const getAppColor = (): string => {
  return getComputedStyle(document.documentElement).backgroundColor;
};

export const syncThemeColorWithMeta = (color: string) => {
  const themeColor: HTMLMetaElement | null = document.head.querySelector(
    'meta[name=theme-color]'
  );

  themeColor?.setAttribute('content', color);
};

export const usePreferredTheme = (defaultTheme: Theme = 'dark') => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const applyTheme = () => setTheme(getPreferredTheme() ?? defaultTheme);

    applyTheme();

    const mediaQuery = window?.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', applyTheme);

    return () => mediaQuery.removeEventListener('change', applyTheme);
  });

  return theme;
};

export const usePreferredThemeMetaSync = () => {
  const theme = usePreferredTheme();

  useEffect(() => {
    syncThemeColorWithMeta(getAppColor());
  }, [theme]);
};

function getPreferredTheme(): Theme | undefined {
  const hasMatchMedia: boolean = Object.hasOwn(window, 'matchMedia');

  if (!hasMatchMedia) {
    return undefined;
  }

  const isDark: boolean = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return isDark ? 'dark' : 'light';
}
