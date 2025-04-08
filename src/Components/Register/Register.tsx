import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.scss";

interface ErrorsInterface {
  username?: boolean;
  email?: boolean;
  password?: boolean;
  repeatPassword?: boolean;
  agree?: boolean;
}

const Register = () => {
  const navigate = useNavigate();
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

  const createUser = async (name: string, email: string, password: string) => {
    const response = await fetch(
      "https://blog-platform.kata.academy/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: name,
            email: email,
            password: password,
          },
        }),
      }
    );

    if (response.ok) {
      navigate("/auth");
      alert("Успешная регистрация!");
    } else {
      alert("Логин или Почта уже используються!");
      console.error("Error creating user:", response.status);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.length > 16 || username.length < 6) {
      return setErrors({ username: true });
    } else {
      setErrors({ username: false });
    }

    if (!email.includes("@")) {
      return setErrors({ email: true });
    } else {
      setErrors({ email: false });
    }

    if (password.length < 6 || password.length > 16) {
      return setErrors({ password: true });
    } else {
      setErrors({ password: false });
    }

    if (password !== repeatPassword) {
      return setErrors({ repeatPassword: true });
    } else {
      setErrors({ repeatPassword: false });
    }

    if (!agree) {
      return setErrors({ agree: true });
    } else {
      setErrors({ agree: false });
    }

    createUser(username, email, password);
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
                  errors.username === true
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>

            <p className="register-container__paragraph">
              <label className="register-container__label">Email address</label>
              <br />
              <input
                className={
                  errors.email === true
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>

            <p className="register-container__paragraph">
              <label className="register-container__label">Password</label>
              <br />
              <input
                className={
                  errors.password === true
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </p>

            <p className="register-container__paragraph">
              <label className="register-container__label">
                Repeat Password
              </label>
              <br />
              <input
                className={
                  errors.repeatPassword === true
                    ? "register-container__input input-error"
                    : "register-container__input"
                }
                type="password"
                placeholder="Password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
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
                  errors.agree === true
                    ? "register-container__label info-label input-error"
                    : "register-container__label info-label"
                }
                htmlFor="agreeCheckbox"
              >
                I agree to the processing of my personal{" "}
                <span
                  className={
                    errors.agree === true
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
