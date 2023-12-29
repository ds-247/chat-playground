import React from "react";
import { NavLink } from "react-router-dom";
import auth from "../../services/authService";
import "./home.css";

function Home() {
  const user = auth.getCurrentUser();

  return (
    <>
      <div className="home-blur-container">
        <div className="home-container"></div>
      </div>

      <div className="home-button-container">
        <NavLink to={!user ?  "/register" : "/users"}>
          <button
            className="home-chat-button"
            aria-label="Start a chat"
          >
            Let's Chat
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;
