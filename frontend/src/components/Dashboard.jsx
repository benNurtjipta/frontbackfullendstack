import { NavLink } from "react-router";
import Card from "./Card";
import { useEffect } from "react";

const Dashboard = ({ userTodos, setUserTodos }) => {
  return (
    <section className="todos">
      <NavLink to="/newtodo">
        <button className="add-todo">Add ToDo</button>
      </NavLink>
      {userTodos.map((toDo, index) => {
        return <Card setUserTodos={setUserTodos} key={index} toDo={toDo} />;
      })}
    </section>
  );
};
export default Dashboard;
