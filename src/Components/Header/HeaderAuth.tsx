import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/store";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../Redux/ArticlesActions";

const HeaderAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.articles.user.user);
  const img = useSelector((state: RootState) => state.articles.user.user.image);

  return (
    <>
      <div className="header__block-auth-on">
        <button
          className="header__create-article"
          onClick={() => {
            navigate("/");
          }}
        >
          Create article
        </button>
        <p className="header__auth-name" onClick={() => navigate("/profile")}>
          {user?.username}
        </p>
        <img
          className="header__auth-avatar"
          src={
            img
              ? img
              : "https://static.productionready.io/images/smiley-cyrus.jpg"
          }
          onClick={() => navigate("/profile")}
        ></img>
        <button
          className="header__log-out"
          onClick={() => {
            navigate("/");
            dispatch({ type: LOG_OUT });
            localStorage.clear();
          }}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default HeaderAuth;
