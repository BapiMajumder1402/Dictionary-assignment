import { configureStore } from '@reduxjs/toolkit';
import { wordsApi } from './api/wordsApi';

const store = configureStore({
    reducer: {
        [wordsApi.reducerPath]: wordsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(wordsApi.middleware),
});

export default store;
