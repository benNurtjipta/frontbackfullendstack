import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Header = ({ currentUser, setCurrentUser, setUserTodos }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (currentUser) {
      setCurrentUser(false);
      setIsLoggedIn(false);
      setUserTodos(false);
      return;
    }
    setIsLoggedIn(!isLoggedIn);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setCurrentUser(data);
    setIsLoggedIn(false);

    const resToDos = await fetch("http://localhost:5500/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const toDos = await resToDos.json();
    setUserTodos(toDos);

    navigate("/dashboard");
  };

  return (
    <div className="header-wrapper">
      <NavLink to="/">
        <h2>WHEREMYHEADAT?</h2>
      </NavLink>
      <div className="log-wrapper">
        <button onClick={handleLogin}>
          {!currentUser ? "LOGIN" : "LOGOUT"}
        </button>
        {isLoggedIn ? (
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        ) : (
          ""
        )}
        <NavLink to="/dashboard">
          <button>DASHBOARD</button>
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
