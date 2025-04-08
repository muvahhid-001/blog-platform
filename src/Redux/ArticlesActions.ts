import { Dispatch } from "redux";

export const FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST";
export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE";
export const FETCH_FULLARTICLE_SUCCESS = "FETCH_FULLARTICLE_SUCCESS";
export const FETCH_FULLARTICLE_FAILED = "FETCH_FULLARTICLE_FAILED";
export const LOGIN_SUCCESSFULL = "LOGIN_SUCCESSFULL";
export const LOG_OUT = "LOG_OUT";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const fetchArticles = (offset: number) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ARTICLES_REQUEST });

  try {
    const response = await fetch(
      `https://blog-platform.kata.academy/api/articles?limit=10&offset=${offset}`,
      getAuthHeaders()
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await response.json();
    dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLES_FAILURE, payload: error });
  }
};
