import { useNavigate } from "react-router-dom";

const HeaderGuest = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="header__block-auth-reg">
        <button
          className="header__sign-in"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Sign In
        </button>
        <button
          className="header__sign-up"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default HeaderGuest;
