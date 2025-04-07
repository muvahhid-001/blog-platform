import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../../Redux/Articles/ArticlesSlice";
import { AppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Header from "../Header/Header";
import "./App.scss";
import ListArticle from "../ListArticle/ListArticle";
import Spiner from "../Spin/Spin";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles(0));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      {articles.length === 0 ? <Spiner /> : <ListArticle />}
    </React.Fragment>
  );
}

export default App;
