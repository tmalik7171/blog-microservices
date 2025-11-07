import React from "react";
import "./CommentBox.css";

function CommentBox({ user, comment }) {
  return (
    <div className="comment-box">
      <strong>{user}</strong>
      <p>{comment}</p>
    </div>
  );
}

export default CommentBox;
