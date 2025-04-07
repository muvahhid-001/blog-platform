import "./Header.scss";

const Header = () => {
  return (
    <header>
      <div className="header">
        <p className="header__title">Realworld Blog</p>
        <div className="header__block-auth-reg">
          <button className="header__sign-in">Sign In</button>
          <button className="header__sign-up">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
