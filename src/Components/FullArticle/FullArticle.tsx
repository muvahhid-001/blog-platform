import "./FullArticle.scss";

interface Author {
  username: string;
  image: string;
  following: boolean;
}

interface ListItemProps {
  title?: string;
  description?: string;
  slug?: string;
  author?: Author;
  tagList?: string[];
  favoritesCount?: number;
}

const ListItem = ({
  title = "Пусто",
  description = "Пусто",
  slug,
  author,
  tagList,
  favoritesCount = 0,
}: ListItemProps) => {
  const currentDate = new Date();
  const formattedTime = currentDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="list-article__item">
      <div className="list-article__up">
        <p className="list-article__title">{title}</p>
        <div className="list-article__like-block">
          <button className="list-article__heart"></button>
          <p className="list-article__like-count">{favoritesCount}</p>
        </div>
        <div className="list-article__author">
          <div className="list-article__author-info">
            <p className="list-article__author-name">{author.username}</p>
            <p className="list-article__author-time">{formattedTime}</p>
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
