import "./EditProfile.scss";

const EditProfile = () => {
  return (
    <main>
      <div className="edit-profile-block">
        <div className="edit-profile-container">
          <h2 className="edit-profile-container__title">Edit profile</h2>
          <form className="edit-profile-container__form">
            <p className="edit-profile-container__paragraph">
              <label className="edit-profile-container__label">Username</label>
              <br />
              <input
                className="edit-profile-container__input"
                type="text"
                placeholder="Username"
              />
            </p>

            <p className="edit-profile-container__paragraph">
              <label className="edit-profile-container__label">
                Email address
              </label>
              <br />
              <input
                className="edit-profile-container__input"
                type="email"
                placeholder="Email address"
              />
            </p>

            <p className="edit-profile-container__paragraph">
              <label className="edit-profile-container__label">
                New password
              </label>
              <br />
              <input
                className="edit-profile-container__input"
                type="password"
                placeholder="New password"
              />
            </p>

            <p className="edit-profile-container__paragraph">
              <label className="register-container__label">Avatar image</label>
              <br />
              <input
                className="edit-profile-container__input"
                type="password"
                placeholder="Avatar image"
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
