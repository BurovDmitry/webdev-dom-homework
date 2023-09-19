export function generatePosts(posts) {
  return posts
    .map((comment, index) => {
      return `<li class="comment" data-comment="${comment.text}" data-name="${
        comment.name
      }">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text} 
            </div>
          </div>
          <div class="comment-footer" >
            <div class="likes">
              <span class="likes-counter">${comment.like}</span>
              <button class="like-button ${
                comment.isLiked ? "-active-like" : ""
              }" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
}

export function generateCommentsPage(posts, user) {
  return `
  <div class="container">
    <div class="load-ind" id="loading-indicator">
      <h1>Данные загружаются...</h1>
    </div>
    <ul class="comments" id="list">
    ${generatePosts(posts)}
    </ul>
    <div id="add-form">
      <input
        readonly
        type="text"
        class="add-form-name"
        id="name-input"
        value="${user?.name}"
      />
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
        id="text-input"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-button">Написать</button>
      </div>
    </div><a>Что бы добавить комментарий<a><a id="link-to-link"><u>Авторизуйтесь</u></a>
  </div>`;
}

export function generateSignInPage() {
  return `<div class="container">
  <div class="universal-form">
  <h3>Форма входа</h3>
      <div class="form-input">
        <input type="text" id="login-input" class="login-input" placeholder="Введите логин" />
        <input
          type="text"
          id="password-input"
          class="login-input"
          placeholder="Введите пароль"
        />
      </div>
      <button class="button-login" id="login-button">Войти</button>
      <button class="button-login" id="link-to-sign-up">Зарегистрироваться</button>
    </div>
  </div>`;
}

export function generateSignUpPage() {
  return `<div class="container">
  <div class="universal-form">
      <h3 class="form-title">Форма регистрации</h3>
      <div class="form-input">
        <input type="text" id="login-input" class="login-input" placeholder="Введите логин" />
        <input type="text" id="name-input" class="login-input" placeholder="Введите имя" />
        <input
          type="text"
          id="password-input"
          class="login-input"
          placeholder="Введите пароль"
        />
      </div>
      <br />
      <button class="button-login" id="sign-up-button">Зарегистрироваться</button>
      <button class="button-login" id="link-to-sign-in">Войти</button>
    </div>
    </div>`;
}
