import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/AuthService";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentsList from "./components/StudentsList";
import AddStudent from "./components/AddStudent";
import Student from "./components/Student";

const App = (props) => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setUser(user);
      setLogged(true)
    }
  }, []);


  const logOut = () => {
    AuthService.logout();
    setUser({});
    setLogged(false);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Teacher's Portal
        </Link>
        {logged &&
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                Student details
              </Link>
            </li>
          </div>
        }
        {logged &&
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Student Info
              </Link>
            </li>
          </div>
        }
        {logged ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={logged}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/students" element={<StudentsList/>} />
          <Route path="/add" element={<AddStudent/>} />
          <Route path="/students/:id" element={<Student/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
