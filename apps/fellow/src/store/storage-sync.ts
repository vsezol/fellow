import { Middleware } from '@reduxjs/toolkit';

const STATE_KEY = 'FELLOW_STATE';

export const getState = () => {
  const data = localStorage.getItem(STATE_KEY);

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data);
  } catch {
    console.error('Failed to get saved state');
  }
};

export const saveState: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem(STATE_KEY, JSON.stringify(getState()));
    return result;
  };
};
