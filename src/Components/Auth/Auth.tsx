import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { loginUser } from "../Api/Api";
import "./Auth.scss";

interface ErrorsInterface {
  email?: boolean;
  password?: boolean;
}

const isValidEmail = (email: string): boolean => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsInterface>({
    email: false,
    password: false,
  });

  const hundleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    const newErrors: ErrorsInterface = {};

    if (!email.trim() || !isValidEmail(email)) {
      newErrors.email = true;
      hasError = true;
    } else {
      newErrors.email = false;
    }

    if (!password.trim() || password.length < 6 || password.length > 40) {
      newErrors.password = true;
      hasError = true;
    } else {
      newErrors.password = false;
    }

    setErrors(newErrors);
    if (hasError) return;

    loginUser(email, password, dispatch, navigate);
  };

  return (
    <main>
      <div className="auth-block">
        <div className="auth-container">
          <h2 className="auth-container__title">Sign In</h2>
          <form className="auth-container__form" onSubmit={hundleSubmit}>
            <p className="auth-container__paragraph">
              <label className="auth-container__label">User Address</label>
              <br />
              <input
                className={
                  errors.email
                    ? "auth-container__input input-error"
                    : "auth-container__input"
                }
                type="text"
                placeholder="User Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <p className="auth-container__paragraph">
              <label className="auth-container__label">Password</label>
              <br />
              <input
                className={
                  errors.password
                    ? "auth-container__input input-error"
                    : "auth-container__input"
                }
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>

            <button type="submit" className="auth-container__button">
              Sign In
            </button>
            <p className="auth-container__paragraph paragraph-last">
              Don’t have an account?{" "}
              <button
                className="paragraph-last-button"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign Up
              </button>
              .
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Auth;
export { loginUser };
