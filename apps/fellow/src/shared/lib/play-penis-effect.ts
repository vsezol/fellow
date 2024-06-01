import penisSvg from '../../assets/penis.svg';

export const playPenisEffect = () => {
  const elements: HTMLImageElement[] = [];

  let direction = 1;
  for (let x = 0; x <= 100; x += 12) {
    for (let y = 0; y <= 100; y += 12) {
      direction *= -1;

      elements.push(createPenisElement(x, y, direction));
    }
  }

  elements.forEach((element) => {
    document.body.appendChild(element);
  });

  elements.forEach((element) => {
    element.classList.add('penis_animated');
  });

  setTimeout(() => {
    elements.forEach((element) => element.remove());
  }, 5000);
};

const createPenisElement = (x: number, y: number, direction: number) => {
  const element = document.createElement('img');
  element.className = 'penis';
  element.style.setProperty(`--x`, `${x}`);
  element.style.setProperty(`--y`, `${y}`);
  element.style.setProperty(`--direction`, `${direction}`);
  element.src = penisSvg;

  return element;
};
