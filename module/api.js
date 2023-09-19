export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/dima-burov/comments", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
}


export function postTodo ({ name, comment }) {
    return fetch("https://wedev-api.sky.pro/api/v1/dima-burov/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: comment,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Сервер упал");
      }
    })
}