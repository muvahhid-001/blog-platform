import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./Articles/ArticlesSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
