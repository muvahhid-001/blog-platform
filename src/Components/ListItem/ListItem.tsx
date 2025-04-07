import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import "./ListItem.scss";

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
  favoritesCount = 0,
  createdAt,
}: ListItemProps) => {
  const navigate = useNavigate();
  const goToFullArticle = () => {
    navigate(`/article/${slug}`);
  };

  const dateString = createdAt.toString();
  const date = DateTime.fromISO(dateString);
  const formattedDate = date.toFormat("MMMM d, yyyy");

  return (
    <li className="list-article__item">
      <div className="list-article__up">
        <button className="list-article__title" onClick={goToFullArticle}>
          {title}
        </button>
        <div className="list-article__like-block">
          <button className="list-article__heart"></button>
          <p className="list-article__like-count">{favoritesCount}</p>
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
          ></img>
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
