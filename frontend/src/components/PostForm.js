import React, { useState } from "react";
import API from "../utils/api";

export default function PostForm({ onPostCreated }) {
  const [form, setForm] = useState({ title: "", body: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", form);
      alert("Post created!");
      setForm({ title: "", body: "" });
      onPostCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <textarea name="body" placeholder="Write something..." value={form.body} onChange={handleChange} />
      <button type="submit">Publish</button>
    </form>
  );
}
