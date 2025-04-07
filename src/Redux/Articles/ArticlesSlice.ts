import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface Article {
  title: string;
  slug: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

interface ArticlesState {
  articles: Article[];
  articlesCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ArticlesState = {
  articles: [],
  articlesCount: 0,
  status: "idle",
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (offset: number) => {
    const res = await fetch(
      `https://blog-platform.kata.academy/api/articles?limit=10&offset=${offset}`
    );
    const data = await res.json();
    return data;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default articlesSlice.reducer;
