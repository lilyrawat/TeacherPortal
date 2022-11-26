import React, { useState, useEffect } from "react";

import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

const Home = ({ isLoggedIn }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h2>Welcome to the Teacher's Portal!</h2>
        <h4>{isLoggedIn ? "You're already logged in! Checkout Student details for more information" : "You could get started by logging in!"}</h4>
      </header>
    </div>
  );
};

export default Home;
