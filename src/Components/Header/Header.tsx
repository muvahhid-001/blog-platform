import { useNavigate } from "react-router-dom";
import "./Header.scss";
import HeaderGuest from "./HeaderGuest";
import HeaderAuth from "./HeaderAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const Header = () => {
  const isLogin = useSelector((state: RootState) => state.articles.isLogin);

  const navigate = useNavigate();
  return (
    <header>
      <div className="header">
        <p
          className="header__title"
          onClick={() => {
            navigate("/");
          }}
        >
          Realworld Blog
        </p>
        {isLogin === false ? <HeaderGuest /> : <HeaderAuth />}
      </div>
    </header>
  );
};

export default Header;
