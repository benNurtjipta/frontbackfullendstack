const Card = ({ toDo, setUserTodos }) => {
  const toggleStatus = async () => {
    const res = await fetch("http://localhost:5500/editstate", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    });
    const data = await res.json();

    setUserTodos((prev) =>
      prev.map((todo) => (todo.id === data.id ? data : todo))
    );
  };

  const deleteTodo = async () => {
    const res = await fetch("http://localhost:5500/deletetodo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toDo),
    });
    setUserTodos((prev) => prev.filter((todo) => todo.id !== toDo.id));
  };

  return (
    <div className={`todo-card ${toDo.state ? "completed" : ""}`}>
      <div className="todo-header">
        <h3>{toDo.title}</h3>
        {toDo.state && <span className="status">✓ DONE</span>}
      </div>
      <p className="todo-text">{toDo.text}</p>
      <div onClick={toggleStatus} className="options">
        <button className="done-button">mark as done</button>
      </div>
      <div onClick={deleteTodo} className="options">
        <button className="delete-button">delete</button>
      </div>
    </div>
  );
};
export default Card;
