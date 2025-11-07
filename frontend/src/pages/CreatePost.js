import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/api/v1/posts",
        { title, body },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Post created successfully!");
    } catch (err) {
      setMessage("Failed to create post");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Post</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <button type="submit">Publish</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreatePost;
