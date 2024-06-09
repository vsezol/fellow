import { getStringHash } from './get-string-hash';

export const getHslColorFromString = (
  str: string,
  saturation = 50,
  lightness = 50
) => `hsl(${getStringHash(str) % 360}, ${saturation}%, ${lightness}%)`;
