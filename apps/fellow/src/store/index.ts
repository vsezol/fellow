import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { chatsSlice } from '../entity/chats';
import { userSlice } from '../entity/user';
import { StorageOptions, getStorageState, saveStateToStorage } from '../shared';

const storageOptions: StorageOptions = {
  name: 'FELLOW',
  version: 0,
};

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  chats: chatsSlice.reducer,
});

export const store = configureStore({
  preloadedState: getStorageState(storageOptions),
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveStateToStorage(storageOptions)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
