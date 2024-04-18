export const setVhVariable = () => {
  const height = window.innerHeight;
  const vh = `${height * 0.01}px`;

  document.documentElement.style.setProperty('--vh', vh);
};
