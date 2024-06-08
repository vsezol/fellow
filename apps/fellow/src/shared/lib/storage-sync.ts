import { Middleware } from '@reduxjs/toolkit';

export interface StorageOptions {
  name: string;
  version: number;
  stateKeys: string[];
}

const getStateKey = ({ name, version }: StorageOptions) => `${name}_${version}`;

export const getStorageState = (options: StorageOptions) => {
  const data = localStorage.getItem(getStateKey(options));

  if (!data) {
    return;
  }

  try {
    return JSON.parse(data);
  } catch {
    console.error('Failed to get saved state');
  }
};

export const saveStateToStorage: (options: StorageOptions) => Middleware =
  (options) =>
  ({ getState }) => {
    return (next) => (action) => {
      const state = getState();
      const stateToSave = Object.fromEntries(
        options.stateKeys.map((k) => [k, state[k]])
      );

      localStorage.setItem(getStateKey(options), JSON.stringify(stateToSave));

      return next(action);
    };
  };
