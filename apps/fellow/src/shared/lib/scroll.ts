const preventDefault = (event: Event) => event.preventDefault();

export function disableMobileScroll() {
  window.addEventListener('touchmove', preventDefault, {
    passive: false,
  });
}

export function enableMobileScroll() {
  window.removeEventListener('touchmove', preventDefault);
}
