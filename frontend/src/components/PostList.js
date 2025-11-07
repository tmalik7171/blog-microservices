import React from "react";
import CommentSection from "./CommentSection";

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((p) => (
        <div key={p._id} className="post">
          <h3>{p.title}</h3>
          <p>{p.body}</p>
          <small>by {p.authorName}</small>
          <CommentSection postId={p._id} />
        </div>
      ))}
    </div>
  );
}
