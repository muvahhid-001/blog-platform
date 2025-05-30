import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { editUser } from "../Api/Api";
import "./EditProfile.scss";

interface ErrorsInterface {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  img?: boolean;
}

const EditProfile = () => {
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newImg, setNewImg] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsInterface>({
    name: false,
    email: false,
    password: false,
    img: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const hungleClick = (event: React.FormEvent): void => {
    event.preventDefault();
    let hasError = false;
    const newErrors: ErrorsInterface = {};

    if (!newName.trim()) {
      newErrors.name = true;
      hasError = true;
    } else {
      newErrors.name = false;
    }

    if (!newEmail.trim() || !/\S+@\S+\.\S+/.test(newEmail)) {
      newErrors.email = true;
      hasError = true;
    } else {
      newErrors.email = false;
    }

    if (newPassword && (newPassword.length < 6 || newPassword.length > 40)) {
      newErrors.password = true;
      hasError = true;
    } else {
      newErrors.password = false;
    }

    const isImageUrl = (url: string) => {
      return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url.toLowerCase());
    };
    if (newImg && !isImageUrl(newImg)) {
      newErrors.img = true;
      hasError = true;
    } else {
      newErrors.img = false;
    }

    setErrors(newErrors);
    if (hasError) return;

    editUser(
      newEmail.trim() || "",
      newName.trim() || "",
      newImg.trim() || "",
      newPassword.trim() || "",
      dispatch,
      navigate
    );
  };

  return (
    <main>
      <div className="edit-profile-block">
        <div className="edit-profile-container">
          <h2 className="edit-profile-container__title">Edit profile</h2>
          <form className="edit-profile-container__form" onSubmit={hungleClick}>
            <p className="edit-profile-container__paragraph">
              <label className="edit-profile-container__label">Username</label>
              <br />
              <input
                className={
                  errors.name === false
                    ? "edit-profile-container__input"
                    : "edit-profile-container__input input-error"
                }
                type="text"
                placeholder="Username"
                onChange={(e) => setNewName(e.target.value)}
              />
            </p>
            <p className="edit-profile-container__paragraph">
              <label className="edit-profile-container__label">
                Email address
              </label>
              <br />
              <input
                className={
                  errors.email === false
                    ? "edit-profile-container__input"
                    : "edit-profile-container__input input-error"
                }
                type="email"
                placeholder="Email address"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </p>
            <p className="edit-profile-container__paragraph">
              <label className="edit-profile-container__label">
                New password
              </label>
              <br />
              <input
                className={
                  errors.password === false
                    ? "edit-profile-container__input"
                    : "edit-profile-container__input input-error"
                }
                type="password"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </p>
            <p className="edit-profile-container__paragraph">
              <label className="register-container__label">Avatar image</label>
              <br />
              <input
                className={
                  errors.img === false
                    ? "edit-profile-container__input"
                    : "edit-profile-container__input input-error"
                }
                type="text"
                placeholder="Avatar image"
                onChange={(e) => setNewImg(e.target.value)}
              />
            </p>
            <button type="submit" className="edit-profile-container__button">
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
