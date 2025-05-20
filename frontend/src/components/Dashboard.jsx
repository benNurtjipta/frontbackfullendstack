import Card from "./Card";

const Dashboard = ({ userTodos }) => {
  return (
    <section className="todos">
      {userTodos.map((toDo, index) => {
        return <Card key={index} toDo={toDo} />;
      })}
    </section>
  );
};
export default Dashboard;
