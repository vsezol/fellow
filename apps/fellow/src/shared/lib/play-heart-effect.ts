export const playHeartEffect = () => {
  const element = createHeartElement();

  document.body.appendChild(element);

  element.classList.add('heart_animated');

  setTimeout(() => {
    element.remove();
  }, 2300);
};

const createHeartElement = () => {
  const element = document.createElement('div');
  element.className = 'heart';

  return element;
};
