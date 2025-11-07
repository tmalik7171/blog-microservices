import React from "react";
import "./PostCard.css";

function PostCard({ title, author, body }) {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p className="post-author">By {author}</p>
      <p className="post-body">{body}</p>
      <button className="read-btn">Read More</button>
    </div>
  );
}

export default PostCard;
