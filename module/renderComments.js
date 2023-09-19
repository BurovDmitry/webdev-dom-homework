export const renderComments = ({ posts, initEventListeners, listElement }) => {
    const commentsHTML = posts
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
  
    listElement.innerHTML = commentsHTML;

    initEventListeners();
  };