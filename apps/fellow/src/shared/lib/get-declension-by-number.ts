export function getDeclensionByNumber(
  value: number,
  words: [string, string, string]
): string {
  const tens = Math.abs(value) % 100;
  const units = tens % 10;

  if (tens > 10 && tens < 20) {
    return words[2];
  }

  if (units > 1 && units < 5) {
    return words[1];
  }

  if (units === 1) {
    return words[0];
  }

  return words[2];
}
