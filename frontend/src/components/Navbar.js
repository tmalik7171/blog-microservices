import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">MicroBlog</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Posts</li>
        <li>About</li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;
