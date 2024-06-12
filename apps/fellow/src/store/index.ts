import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { chatApi, chatsSlice } from '../entities/chat';
import { chatMessageApi } from '../entities/chat-message';
import { userApi, userSlice } from '../entities/user';
import { userSettingsSlice } from '../entities/user-settings';
import { StorageOptions, getStorageState, saveStateToStorage } from '../shared';
import { fellowApi } from './fellow-api';

const storageOptions: StorageOptions = {
  name: 'FELLOW',
  version: 8,
  stateKeys: [userSlice.name, userSettingsSlice.name],
};

export const rootReducer = combineReducers({
  // stores
  [userSlice.name]: userSlice.reducer,
  [chatsSlice.name]: chatsSlice.reducer,
  [userSettingsSlice.name]: userSettingsSlice.reducer,
  // api
  [chatMessageApi.reducerPath]: chatMessageApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [fellowApi.reducerPath]: fellowApi.reducer,
});

export const store = configureStore({
  preloadedState: getStorageState(storageOptions),
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(saveStateToStorage(storageOptions))
      .concat(chatMessageApi.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware)
      .concat(fellowApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
