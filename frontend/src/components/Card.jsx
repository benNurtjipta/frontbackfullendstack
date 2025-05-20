const Card = ({ toDo }) => {
  return (
    <div className={`todo-card ${toDo.state ? "completed" : ""}`}>
      <div className="todo-header">
        <h3>{toDo.title}</h3>
        {toDo.state && <span className="status">✓ erledigt</span>}
      </div>
      <p className="todo-text">{toDo.text}</p>
    </div>
  );
};
export default Card;
