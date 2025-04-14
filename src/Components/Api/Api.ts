import { AppDispatch } from "../../Redux/store";
import { Dispatch } from "redux";
import {
  ADD_STATUS,
  DEL_STATUS,
  FETCH_FULLARTICLE_FAILED,
  FETCH_FULLARTICLE_SUCCESS,
  LOGIN_SUCCESSFULL,
  LOG_OUT,
} from "../../Redux/ArticlesActions";

interface UserData {
  email?: string;
  username?: string;
  image?: string;
  password?: string;
  bio: string;
}

const url = "https://blog-platform.kata.academy/api";

export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  const response = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      },
    }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("name", data.user.username);
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("login", email);
    localStorage.setItem("password", password);
    dispatch({ type: LOGIN_SUCCESSFULL, payload: data });
    navigate("/");
  } else {
    alert("Неправильный логин или пароль!");
    console.error("Error logging in:", response.status);
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  navigate: (path: string) => void
) => {
  const response = await fetch(`${url}/users`, {
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
  });
  if (response.ok) {
    navigate("/sign-in");
    alert("Успешная регистрация!");
  } else {
    alert("Логин или Почта уже используються!");
    console.error("Error creating user:", response.status);
  }
};

export const editUser = async (
  email: string,
  name: string,
  img: string,
  password: string,
  dispatch: AppDispatch,
  navigate: (path: string) => void
) => {
  const userData: UserData = {
    bio: "Buga..ga, not edit bio, beeeee.",
  };
  if (email) userData.email = email;
  if (name) userData.username = name;
  if (img) userData.image = img;
  if (password) userData.password = password;
  const response = await fetch(`${url}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({ user: userData }),
  });
  if (response.ok) {
    alert("Данные успешно изменены!");
    dispatch({ type: LOG_OUT });
    navigate("/");
    localStorage.clear();
  } else {
    alert("Ошибка изменении данных!");
    console.error("Error updating user:", response.status);
  }
};

export const fetchData =
  (slug: string, m?: boolean) => async (dispatch: Dispatch) => {
    try {
      const method = m === undefined ? "GET" : m ? "POST" : "DELETE";
      const response = await fetch(
        `${url}/articles/${slug}${m !== undefined ? "/favorite" : ""}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed...");
      }
      const data = await response.json();
      dispatch({ type: FETCH_FULLARTICLE_SUCCESS, payload: data.article });
      return data.article;
    } catch (error) {
      dispatch({ type: FETCH_FULLARTICLE_FAILED });
      throw error;
    }
  };

export interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export async function createArticle(
  article: ArticleData,
  navigate: (path: string) => void
): Promise<void> {
  try {
    const response = await fetch(`${url}/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to create article");
    }

    alert("Поздравляем... Вы успешно поделились чем-то новым!");
    navigate("/");
  } catch (error) {
    alert("Хмм... Ошибка в данных! Или же ServerDied...");
    console.error("Ошибка при создании статьи:", error);
  }
}

export const checkArticle = async (slug: string, dispatch) => {
  try {
    const response = await fetch(`${url}/articles/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.article.author.username === localStorage.getItem("name")) {
      dispatch({ type: ADD_STATUS });
    } else {
      dispatch({ type: DEL_STATUS });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to check article");
    }
  } catch (error) {
    console.error("Ошибка при проверки статьи:", error);
  }
};

export const deleteArticle = async (
  slug: string,
  navigate: (path: string) => void
) => {
  try {
    const response = await fetch(`${url}/articles/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("Упс... Удаление не удалось.");
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to delete article");
    }
    alert("Статья успешно удалена!");
    navigate("/");
  } catch (error) {
    console.error("Ошибка при проверки статьи:", error);
  }
};

interface EditData {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export const editArticle = async (
  slug: string,
  editData: EditData,
  navigate: (path: string) => void
) => {
  try {
    const response = await fetch(`${url}/articles/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    if (!response.ok) {
      alert("Упс... Редактирование не удалось.");
      const errorData = await response.json();
      throw new Error(errorData?.message || "Failed to delete article");
    }
    alert("Статья успешно отредактирована!");
    navigate("/");
  } catch (error) {
    console.error("Ошибка при редактировании статьи:", error);
  }
};
