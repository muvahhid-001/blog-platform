import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "../../Redux/store";
import ListItem from "../ListItem/ListItem";
import { fetchArticles } from "../../Redux/Articles/ArticlesSlice";
import "./ListArticle.scss";

const ListArticle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const articlesCount = useSelector(
    (state: RootState) => state.articles.articlesCount
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const offset = (currentPage - 1) * 10;
    dispatch(fetchArticles(offset));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <ul className="list-article">
        {articles.map((item, index) => {
          return (
            <ListItem
              key={index}
              title={item.title}
              description={item.description}
              slug={item.slug}
              author={item.author}
              tagList={item.tagList}
              favoritesCount={item.favoritesCount}
            />
          );
        })}
      </ul>
      <Pagination
        current={currentPage}
        total={articlesCount}
        pageSize={10}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "40px",
        }}
      />
    </main>
  );
};

export default ListArticle;
