import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { chatsSlice } from '../entities/chat';
import { chatMessageApi } from '../entities/chat-message/api/chat-message-api';
import { userApi, userSlice } from '../entities/user';
import { StorageOptions, getStorageState, saveStateToStorage } from '../shared';

const storageOptions: StorageOptions = {
  name: 'FELLOW',
  version: 4,
  stateKeys: [userSlice.name],
};

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [chatsSlice.name]: chatsSlice.reducer,
  [chatMessageApi.reducerPath]: chatMessageApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  preloadedState: getStorageState(storageOptions),
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(saveStateToStorage(storageOptions))
      .concat(chatMessageApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
