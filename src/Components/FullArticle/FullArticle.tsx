import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PopConFirm from "../PopConFirm/PopConFirm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { checkArticle, fetchData } from "../Api/Api";
import { DateTime } from "luxon";
import "./FullArticle.scss";
import ReactMarkdown from "react-markdown";
import Spiner from "../Spin/Spin";

const FullArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.articles.isLogin);
  const fullArticle = useSelector(
    (state: RootState) => state.articles.fullArticle
  );
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [m, setM] = useState<boolean>(fullArticle?.favorited || false);
  const [favoritesCount, setFavoritesCount] = useState<number>(
    fullArticle?.favoritesCount || 0
  );
  const statusAuthor = useSelector(
    (state: RootState) => state.articles.statusArticle
  );

  useEffect(() => {
    if (slug) {
      setLoading(true);
      dispatch(fetchData(slug))
        .then((article) => {
          setM(article.favorited);
          setFavoritesCount(article.favoritesCount);
        })
        .finally(() => setLoading(false));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    checkArticle(slug, dispatch);
  }, []);

  if (loading || !fullArticle) return <Spiner />; // Проверка, пока данные не загружены

  const dateString = fullArticle.createdAt.toString();
  const date = DateTime.fromISO(dateString || "");
  const formattedDate = date.toFormat("MMMM d, yyyy");

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    const newM = !m;
    setM(newM);
    try {
      const updatedArticle = await dispatch(fetchData(slug, newM));
      setFavoritesCount(updatedArticle.favoritesCount);
    } catch (error) {
      setM(!newM);
      alert("Ошибка при добавлении в избранное!");
    } finally {
      setLikeLoading(false);
    }
  };

  const oldInfo = {
    title: fullArticle.title,
    descriptions: fullArticle.description,
    body: fullArticle.body,
    tagList: fullArticle.tagList,
  };

  return (
    <div className="list-full-article">
      <div className="list-full-article__item">
        <div className="list-full-article__up">
          <button className="list-full-article__title">
            {fullArticle.title}
          </button>
          <div className="list-full-article__like-block">
            <button
              className="list-full-article__heart"
              style={{
                backgroundImage: `url("./${m ? "../../heart-red.png" : "../../heart.png"}")`,
              }}
              onClick={handleLike}
              disabled={isLogin ? false : true}
            ></button>
            <p className="list-full-article__like-count">{favoritesCount}</p>
            {likeLoading && <p className="anim-like-loading">-</p>}
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
            />
          </div>
          {statusAuthor === true && slug ? (
            <div className="list-full-article__edit-button">
              <PopConFirm slug={slug} navigate={navigate} />
              <button
                className="list-full-article__edit"
                onClick={() =>
                  navigate(`/articles/${slug}/edit`, { state: oldInfo })
                }
              >
                Edit
              </button>
            </div>
          ) : null}
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
