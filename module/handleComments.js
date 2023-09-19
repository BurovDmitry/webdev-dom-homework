export function handleComments(comments) {
  return comments.map((comment) => {
    let timestamp = new Date(comment.date);
    let period = `${timestamp.toLocaleDateString()} ${timestamp
      .toLocaleTimeString()
      .slice(0, -3)}`;
    return {
      id: comment.author.id,
      name: comment.author.name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: period,
      text: comment.text.replaceAll("<", "&lt;").replaceAll(">", "&gt; "),
      like: comment.likes,
      isLike: comment.isLike,
    };
  });
}
