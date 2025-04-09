import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import "./ListItem.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useState, useEffect } from "react";

interface Author {
  username: string;
  image: string;
  following: boolean;
}

interface ListItemProps {
  title: string;
  description: string;
  slug: string;
  author: Author;
  tagList: string[];
  favoritesCount: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
}

const ListItem = ({
  title = "Пусто",
  description = "Пусто",
  slug,
  author,
  tagList,
  favoritesCount,
  createdAt,
  favorited,
}: ListItemProps) => {
  const navigate = useNavigate();

  const goToFullArticle = (): void => {
    navigate(`/article/${slug}`);
  };

  const date = DateTime.fromISO(createdAt.toString());
  const formattedDate = date.toFormat("MMMM d, yyyy");
  const user = useSelector((state: RootState) => state.articles);
  const [like, setLike] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    setLike(favorited);
    setCount(favoritesCount);
  }, [favorited, favoritesCount]);

  const handleFavorite = async () => {
    if (favoriteLoading) return;
    setFavoriteLoading(true);
    try {
      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {
          method: like ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${user.user.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        alert("Ошибка при добавлении в избранное!");
        setFavoriteLoading(false);
        return;
      }
      const data = await response.json();
      setLike(data.article.favorited);
      setCount(data.article.favoritesCount);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <li className="list-article__item">
      <div className="list-article__up">
        <button className="list-article__title" onClick={goToFullArticle}>
          {title}
        </button>
        <div className="list-article__like-block">
          <button
            className="list-article__heart"
            disabled={!user.isLogin || favoriteLoading}
            onClick={handleFavorite}
            style={{
              backgroundImage: `url("./${like ? "heart-red.png" : "heart.png"}")`,
            }}
          ></button>
          <p className="list-article__like-count">{count}</p>
          {favoriteLoading && <p className="anim-like-loading">-</p>}
        </div>
        <div className="list-article__author">
          <div className="list-article__author-info">
            <p className="list-article__author-name">{author.username}</p>
            <p className="list-article__author-time">{formattedDate}</p>
          </div>
          <img
            className="list-article__author-photo"
            src={author.image}
            alt={author.username}
          />
        </div>
      </div>
      <ul className="list-article__tag-list">
        {tagList.slice(0, 6).map((tag, index) => (
          <li key={index} className="list-article__tag-item">
            {tag}
          </li>
        ))}
      </ul>
      <p className="list-article__description">{description}</p>
    </li>
  );
};

export default ListItem;
