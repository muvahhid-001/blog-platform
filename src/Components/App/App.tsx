import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchArticles } from "../../Redux/ArticlesActions";
import { AppDispatch, RootState } from "../../Redux/store";
import Header from "../Header/Header";
import ListArticle from "../ListArticle/ListArticle";
import Spiner from "../Spin/Spin";
import FullArticle from "../FullArticle/FullArticle";
import AlertMsg from "../Alert/Alert";
import Register from "../Register/Register";
import Auth, { loginUser } from "../Auth/Auth";
import EditProfile from "../EditProfile/EditProfile";
import NewArticle from "../NewArticle/NewArticle";
import EditArticle from "../EditArticle/EditArticle";
import { ReactElement } from "react";
import "./App.scss";
import "./Media.scss";

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const isLogin = useSelector((state: RootState) => state.articles.isLogin);
  return isLogin ? element : <Navigate to="/sign-in" />;
};

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
        <Routes>
          <Route
            path="/"
            element={articles.length === 0 ? <Spiner /> : <ListArticle />}
          />
          <Route path="/article/:slug" element={<FullArticle />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Auth />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<EditProfile />} />}
          />
          <Route
            path="/new-article"
            element={<ProtectedRoute element={<NewArticle />} />}
          />
          <Route
            path="/articles/:slug/edit"
            element={<ProtectedRoute element={<EditArticle />} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
