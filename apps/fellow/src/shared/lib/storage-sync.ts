import { Middleware } from '@reduxjs/toolkit';

export interface StorageOptions {
  name: string;
  version: number;
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
      const result = next(action);
      localStorage.setItem(getStateKey(options), JSON.stringify(getState()));

      return result;
    };
  };
