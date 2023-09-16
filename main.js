import { getTodos, postTodo } from "./module/api.js";
import { handleComments } from "./module/handleComments.js";
import { renderComments } from "./module/renderComments.js";

const listElement = document.getElementById("list");
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
let posts = [];

const fetchPromise = () => {
  const loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "block";

  getTodos().then((responseData) => {
    loadingIndicator.style.display = "none";
    posts = handleComments(responseData.comments);
    renderComments({ posts, initEventListeners, listElement });
  });
};

const initEventListeners = () => {
  const buttonElements = document.querySelectorAll(".like-button");

  for (const buttonElement of buttonElements) {
    buttonElement.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = buttonElement.dataset.index;

      if (posts[index].isLiked) {
        posts[index].isLiked = false;
        posts[index].like--;
      } else {
        posts[index].isLiked = true;
        posts[index].like++;
      }

      renderComments({ posts, initEventListeners, listElement });
    });
  }

  const postElements = document.querySelectorAll(".comment");

  for (const postElement of postElements) {
    postElement.addEventListener("click", () => {
      textInputElement.value = `"${postElement.dataset.name} ${postElement.dataset.comment}",`;
    });
  }
};

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("color-error");
  textInputElement.classList.remove("color-error");

  const name = nameInputElement.value;
  const comment = textInputElement.value;

  if (name.length < 3) {
    nameInputElement.classList.add("color-error");
    return;
  }

  if (comment.length < 3) {
    textInputElement.classList.add("color-error");
    return;
  }

  nameInputElement.value = "";
  textInputElement.value = "";

  buttonElement.disabled = true;
  buttonElement.textContent = "Комментарий загружается...";

  postTodo({ name, comment })
    .then(() => {
      fetchPromise();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert("Кажется что-то пошло не так, попробуй позже");
      console.warn(error);
    });
});

fetchPromise();
console.log("It works!");
