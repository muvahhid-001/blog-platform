import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../Redux/ArticlesActions";
import { AppDispatch, RootState } from "../../Redux/store";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./App.scss";
import ListArticle from "../ListArticle/ListArticle";
import Spiner from "../Spin/Spin";
import FullArticle from "../FullArticle/FullArticle";
import AlertMsg from "../Alert/Alert";
import Register from "../Register/Register";
import Auth, { loginUser } from "../Auth/Auth";
import EditProfile from "../EditProfile/EditProfile";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const articles = useSelector((state: RootState) => state.articles.articles);
  useEffect(() => {
    dispatch(fetchArticles(0));
  }, [dispatch]);
  useEffect(() => {
    if (localStorage.getItem("login")) {
      loginUser(
        localStorage.getItem("login"),
        localStorage.getItem("password"),
        dispatch,
        navigate
      );
    }
  }, []);

  const status = useSelector((state: RootState) => state.articles.status);

  return (
    <>
      <Header />
      {status === "failed" ? (
        <AlertMsg />
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={articles.length === 0 ? <Spiner /> : <ListArticle />}
            />
            <Route path="/article/:slug" element={<FullArticle />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Auth />} />
            <Route path="/profile" element={<EditProfile />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
