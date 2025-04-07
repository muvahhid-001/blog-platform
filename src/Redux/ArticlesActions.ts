import { Dispatch } from "redux";

export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";
export const FETCH_FULLARTICLE_SUCCESS = "FETCH_FULLARTICLE_SUCCESS";
export const FETCH_FULLARTICLE_FAILED = "FETCH_FULLARTICLE_FAILED";

export const fetchArticles = (offset: number) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ARTICLES_REQUEST });
  try {
    const response = await fetch(
      `https://blog-platform.kata.academy/api/articles?limit=10&offset=${offset}`
    );
    const data = await response.json();
    dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error });
  }
};
