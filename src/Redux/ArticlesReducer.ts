import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_FULLARTICLE_SUCCESS,
  FETCH_FULLARTICLE_FAILED,
  LOGIN_SUCCESSFULL,
  LOG_OUT,
} from "./ArticlesActions";

interface Author {
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

interface User {
  user?: {
    email: string;
    token: string;
    username: string;
  };
}

interface ArticlesState {
  articles: Article[];
  fullArticle: Article | null;
  articlesCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  isLogin: boolean;
  user: User;
}

type PayLoad =
  | { type: typeof FETCH_ARTICLES_REQUEST }
  | {
      type: typeof FETCH_ARTICLES_SUCCESS;
      payload: { articles: Article[]; articlesCount: number };
    }
  | { type: typeof FETCH_ARTICLES_FAILURE }
  | { type: typeof LOG_OUT }
  | { type: typeof FETCH_FULLARTICLE_SUCCESS; payload: Article }
  | { type: typeof LOGIN_SUCCESSFULL; payload: object }
  | { type: typeof FETCH_FULLARTICLE_FAILED };

const initialState: ArticlesState = {
  articles: [],
  fullArticle: null,
  articlesCount: 0,
  status: "idle",
  isLogin: false,
  user: {},
};

const articlesReducer = (
  state = initialState,
  action: PayLoad
): ArticlesState => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return { ...state, status: "loading" };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, status: "failed" };
    case FETCH_FULLARTICLE_SUCCESS:
      return { ...state, fullArticle: action.payload, status: "succeeded" };
    case FETCH_FULLARTICLE_FAILED:
      return { ...state, status: "failed" };
    case LOGIN_SUCCESSFULL:
      return { ...state, isLogin: true, user: action.payload };
    case LOG_OUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

export default articlesReducer;
