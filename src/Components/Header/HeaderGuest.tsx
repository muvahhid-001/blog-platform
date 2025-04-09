import { useNavigate } from "react-router-dom";

const HeaderGuest = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="header__block-auth-reg">
        <button
          className="header__sign-in"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign In
        </button>
        <button
          className="header__sign-up"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default HeaderGuest;
