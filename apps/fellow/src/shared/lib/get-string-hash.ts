export const getStringHash = (inputString: string): number => {
  const charCodes: number[] = Array.from(inputString).map((char: string) =>
    char.charCodeAt(0)
  );

  const hash: number = charCodes.reduce(
    (hashAccumulator: number, currentChar: number) => {
      /** get 32-bit integer: (hash << 5) - hash === hash * 31 */
      const currentHash: number =
        currentChar + ((hashAccumulator << 5) - hashAccumulator);

      return currentHash & currentHash;
    },
    0
  );

  return hash;
};
