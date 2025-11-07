import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("⚠️ Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  const handleLike = (index) => {
    const newPosts = [...posts];
    newPosts[index].likes = (newPosts[index].likes || 0) + 1;
    setPosts(newPosts);
  };

  return (
    <div className="home-container">
      <div className="floating-bg"></div>
      <h1>✨ Discover & Share Your Thoughts</h1>
      <p className="subtitle">
        Express yourself with words, emotions, and creativity 💫
      </p>

      {loading ? (
        <div className="loader">🌈 Loading amazing posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
            alt="No Posts"
            className="no-posts-img"
          />
          <p>No posts yet 💭 Be the first to share something awesome!</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post, index) => (
            <div className="post-card" key={post._id}>
              <div className="post-header">
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${
                    post.authorName || "user"
                  }`}
                  alt="avatar"
                  className="avatar"
                />
                <div>
                  <h3>{post.title}</h3>
                  <small>✍️ {post.authorName || "Anonymous"}</small>
                </div>
              </div>

              <p className="post-body">{post.body}</p>

              <div className="post-footer">
                <span className={`tag tag-${index % 4}`}>
                  {["💡 Idea", "🔥 Trend", "💬 Thought", "🌈 Vibe"][index % 4]}
                </span>

                <button
                  className="like-btn"
                  onClick={() => handleLike(index)}
                >
                  ❤️ {post.likes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
