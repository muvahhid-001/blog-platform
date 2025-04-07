import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../Redux/ArticlesActions";
import { AppDispatch, RootState } from "../../Redux/store";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import "./App.scss";
import ListArticle from "../ListArticle/ListArticle";
import Spiner from "../Spin/Spin";
import FullArticle from "../FullArticle/FullArticle";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles(0));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={articles.length === 0 ? <Spiner /> : <ListArticle />}
        />
        <Route path="/article/:slug" element={<FullArticle />} />
      </Routes>
    </>
  );
}

export default App;
