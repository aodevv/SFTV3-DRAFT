import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { createLogger } from 'redux-logger';

import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import authReducer from './authSlice/authSlice';
import layoutReducer from './layoutSlice/layoutSlice';

import clientReducer from './clientSlice/clientSlice';
import userReducer from './userSlice/userSlice';
import userProfileReducer from './userProfileSlice/userProfileSlice';
import functionReducer from './functionSlice/functionSlice';
// import roleReducer from './roleSlice/roleSlice';
import profileReducer from './profileSlice/profileSlice';
import preferencesReducer from './preferenceSlice/preferenceSlice';
import siteReducer from './siteSlice/siteSlice';
import rolesReducer from './rolesSlice/rolesSlice';
import ptwReducer from './ptwSlice/ptwSlice';

import handle401 from './authSlice/handle401';

const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  client: clientReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  function: functionReducer,
  // role: roleReducer,
  profile: profileReducer,
  preference: preferencesReducer,
  site: siteReducer,
  role: rolesReducer,
  ptw: ptwReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(logger)
      .concat(handle401),
});

export const persistor = persistStore(store);
