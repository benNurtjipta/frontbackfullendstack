import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import NewToDo from "./components/NewToDo";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userTodos, setUserTodos] = useState([]);

  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setUserTodos={setUserTodos}
      />
      <section className="main-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute currentUser={currentUser}>
                <Dashboard
                  currentUser={currentUser}
                  userTodos={userTodos}
                  setUserTodos={setUserTodos}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/newtodo"
            element={
              <PrivateRoute currentUser={currentUser}>
                <NewToDo
                  currentUser={currentUser}
                  userTodos={userTodos}
                  setUserTodos={setUserTodos}
                />
              </PrivateRoute>
            }
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
