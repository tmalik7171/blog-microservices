import React, { useEffect, useState } from "react";
import API from "../utils/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = async () => {
    const res = await API.get(`/comments/${postId}`);
    setComments(res.data);
  };

  const addComment = async () => {
    await API.post(`/comments/${postId}`, { text });
    setText("");
    loadComments();
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="comments">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment..." />
      <button onClick={addComment}>Add</button>
      {comments.map((c) => (
        <p key={c._id}>💬 {c.text}</p>
      ))}
    </div>
  );
}
