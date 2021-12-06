import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { Api } from '../serviceApi/Api';
import { filterSlice, authSlice } from './slice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    filter: filterSlice.reducer,
    auth: persistedAuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(Api.middleware),
});

export const perssiststore = persistStore(store);