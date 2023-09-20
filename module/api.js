export let user;

export const setUser = (newUser) => {
  user = newUser;
};

const commentsURL = "https://wedev-api.sky.pro/api/v2/dima-burov/comments";
const signInURL = "https://wedev-api.sky.pro/api/user/login";
const signUpURL = "https://wedev-api.sky.pro/api/user";

export function getComments() {
  return fetch(commentsURL, {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
}

export function postComment({ name, comment }) {
  if (user === undefined) {
    alert("Пожалуйста авторизуйтесь!");
  }

  return fetch(commentsURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      name: name,
      text: comment,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      throw new Error("Сервер упал");
    }
  });
}

export function signIn({ login, password }) {
  return fetch(signInURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Логин и/или пароль неверные!");
    }

    if (!response.ok) {
      throw new Error("Ошибка сети или сервера");
    }

    return response.json();
  });
}

export function signUp({ login, name, password }) {
  return fetch(signUpURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Введенный логин уже занят!");
    }

    if (!response.ok) {
      throw new Error("Ошибка сети или сервера");
    }

    return response.json();
  });
}
