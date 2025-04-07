import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { DateTime } from "luxon";
import {
  FETCH_FULLARTICLE_FAILED,
  FETCH_FULLARTICLE_SUCCESS,
} from "../../Redux/ArticlesActions";
import "./FullArticle.scss";
import { Dispatch } from "redux";
import ReactMarkdown from "react-markdown";
import Spiner from "../Spin/Spin";

const fetchData = (slug: string) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(
      `https://blog-platform.kata.academy/api/articles/${slug}`
    );
    if (response.ok === false) {
      throw new Error("Failed...");
    }
    const data = await response.json();
    dispatch({ type: FETCH_FULLARTICLE_SUCCESS, payload: data.article });
  } catch (error) {
    dispatch({ type: FETCH_FULLARTICLE_FAILED });
  }
};

const FullArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (slug) {
      dispatch(fetchData(slug));
    }
  }, [slug, dispatch]);

  const fullArticle = useSelector(
    (state: RootState) => state.articles.fullArticle
  );
  if (!fullArticle) return <Spiner />;

  const dateString = fullArticle.createdAt.toString();
  const date = DateTime.fromISO(dateString);
  const formattedDate = date.toFormat("MMMM d, yyyy");

  return (
    <div className="list-full-article">
      <div className="list-full-article__item">
        <div className="list-full-article__up">
          <button className="list-full-article__title">
            {fullArticle.title}
          </button>
          <div className="list-full-article__like-block">
            <button className="list-full-article__heart"></button>
            <p className="list-full-article__like-count">
              {fullArticle.favoritesCount}
            </p>
          </div>
          <div className="list-full-article__author">
            <div className="list-full-article__author-info">
              <p className="list-full-article__author-name">
                {fullArticle.author.username}
              </p>
              <p className="list-full-article__author-time">{formattedDate}</p>
            </div>
            <img
              className="list-full-article__author-photo"
              src={fullArticle.author.image}
              alt={fullArticle.author.username}
            ></img>
          </div>
        </div>
        <ul className="list-full-article__tag-list">
          {fullArticle.tagList.slice(0, 6).map((tag, index) => (
            <li key={index} className="list-full-article__tag-item">
              {tag}
            </li>
          ))}
        </ul>
        <p className="list-full-article__description">
          {fullArticle.description}
        </p>
        <div className="list-full-article__body">
          <ReactMarkdown>{fullArticle.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default FullArticle;
