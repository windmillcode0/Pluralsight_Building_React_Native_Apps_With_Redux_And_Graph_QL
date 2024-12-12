import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../service/baseApi';
import {  setupListeners } from '@reduxjs/toolkit/query';
import reactotron from '~/ReactotronConfig';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSecureStore from 'redux-persist-expo-securestore';
import {FLUSH, PAUSE, PERSIST, persistReducer,persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import authSlice from '../slices/authSlice';

const secureStorage = createSecureStore();

const securePersistConfig = {
  key: 'globo_auth',
  storage: secureStorage,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: persistReducer(securePersistConfig, authSlice),
});



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware),
  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(new Tuple(reactotron.createEnhancer!()))
      : getDefaultEnhancers(),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch();