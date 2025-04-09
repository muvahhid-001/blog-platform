import { createUser } from "../Api/Api";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./Register.scss";

interface ErrorsInterface {
  username?: boolean;
  email?: boolean;
  password?: boolean;
  repeatPassword?: boolean;
  agree?: boolean;
}

const Register = () => {
  const navigate: NavigateFunction = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [agree, setAgree] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsInterface>({
    username: false,
    email: false,
    password: false,
    repeatPassword: false,
    agree: false,
  });

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    let hasError = false;
    const newErrors: ErrorsInterface = {};

    if (username.length < 3 || username.length > 16) {
      newErrors.username = true;
      hasError = true;
    } else {
      newErrors.username = false;
    }
    if (!email.includes("@")) {
      newErrors.email = true;
      hasError = true;
    } else {
      newErrors.email = false;
    }
    if (password.length < 6 || password.length > 20) {
      newErrors.password = true;
      hasError = true;
    } else {
      newErrors.password = false;
    }
    if (password !== repeatPassword) {
      newErrors.repeatPassword = true;
      hasError = true;
    } else {
      newErrors.repeatPassword = false;
    }
    if (!agree) {
      newErrors.agree = true;
      hasError = true;
    } else {
      newErrors.agree = false;
    }
    setErrors(newErrors);
    if (hasError) return;
    createUser(username, email, password, navigate);
  };

  return (
    <main>
      <div className="register-block">
        <div className="register-container">
          <h2 className="register-container__title">Create new account</h2>
          <form className="register-container__form" onSubmit={handleSubmit}>
            <p className="register-container__paragraph">
              <label className="register-container__label">Username</label>
              <br />
              <input
                className={
                  errors.username
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className={errors.username ? "error-text" : "error-text none"}>
                Username must be between 3 and 20 characters
              </p>
            </p>
            <p className="register-container__paragraph">
              <label className="register-container__label">Email address</label>
              <br />
              <input
                className={
                  errors.email
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={errors.email ? "error-text" : "error-text none"}>
                Enter a valid email address
              </p>
            </p>
            <p className="register-container__paragraph">
              <label className="register-container__label">Password</label>
              <br />
              <input
                className={
                  errors.password
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className={errors.password ? "error-text" : "error-text none"}>
                Password length must be between 6 and 40
              </p>
            </p>
            <p className="register-container__paragraph">
              <label className="register-container__label">
                Repeat Password
              </label>
              <br />
              <input
                className={
                  errors.repeatPassword
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="password"
                placeholder="Password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              <p
                className={
                  errors.repeatPassword ? "error-text" : "error-text none"
                }
              >
                Passwords must match
              </p>
            </p>
            <div className="border"></div>
            <p className="register-container__paragraph paragraph-block">
              <input
                className="register-container__input"
                type="checkbox"
                id="agreeCheckbox"
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label
                className={
                  errors.agree
                    ? "register-container__label info-label input-error"
                    : "register-container__label info-label"
                }
                htmlFor="agreeCheckbox"
              >
                I agree to the processing of my personal{" "}
                <span
                  className={
                    errors.agree
                      ? "label-text-info input-error"
                      : "label-text-info"
                  }
                >
                  information
                </span>
              </label>
            </p>
            <button type="submit" className="register-container__button">
              Create
            </button>
            <p className="register-container__paragraph paragraph-last">
              Already have an account?{" "}
              <button
                className="paragraph-last-button"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                Sign In
              </button>
              .
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
