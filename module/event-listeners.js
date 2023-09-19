import { postComment } from "./api.js";
import { generatePosts } from "./html-generators.js";

export function initCommentsEventListeners(
  posts,
  textInputElement,
  listElement
) {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  const postElements = document.querySelectorAll(".comment");
  for (const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();

      const index = likeButtonElement.dataset.index;

      if (posts[index].isLiked) {
        posts[index].isLiked = false;
        posts[index].like--;
      } else {
        posts[index].isLiked = true;
        posts[index].like++;
      }

      listElement.innerHTML = generatePosts(posts);
      initCommentsEventListeners(posts, textInputElement, listElement);
    });
  }

  for (const postElement of postElements) {
    postElement.addEventListener("click", () => {
      textInputElement.value = `"${postElement.dataset.name} ${postElement.dataset.comment}",`;
    });
  }
}

export function initFormEventListener(
  buttonElement,
  nameInputElement,
  textInputElement,
  fetchPromise
) {
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

    postComment({ name, comment })
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
}
