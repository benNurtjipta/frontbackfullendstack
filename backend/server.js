import express from "express";
import cors from "cors";
import fs, { readFileSync } from "fs";

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
  const { username, password } = req.body;
  const newUser = users.find(
    (user) => user.username === username && user.password === password
  );
  res.json(newUser);
});

app.post("/todos", (req, res) => {
  const { userID } = req.body;
  const todos = JSON.parse(fs.readFileSync("./data/todos.json", "utf-8"));
  const userTodos = todos.filter((todo) => todo.uID === userID);
  res.json(userTodos);
});

app.post("/addtodo", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("./data/todos.json", "utf-8"));
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  fs.writeFileSync(
    "./data/todos.json",
    JSON.stringify(todos, null, 2),
    "utf-8"
  );
  res.json({ message: "läuft" });
});

app.patch("/editstate", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("./data/todos.json", "utf-8"));
  const { id } = req.body;
  const todo = todos.find((todo) => todo.id === id);
  todo.state = !todo.state;
  fs.writeFileSync(
    "./data/todos.json",
    JSON.stringify(todos, null, 2),
    "utf-8"
  );
  res.json({ message: "läuft" });
});

app.delete("/deletetodo", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("./data/todos.json", "utf-8"));
  const { id } = req.body;

  const index = todos.findIndex((todo) => {
    return parseInt(todo.id) === parseInt(id);
  });
  console.log(index);

  if (index !== -1) {
    todos.splice(index, 1);
    fs.writeFileSync(
      "./data/todos.json",
      JSON.stringify(todos, null, 2),
      "utf-8"
    );
    res.json({ message: "läuft" });
  } else {
    res.json({ message: "no todo to delete" });
  }
});

app.get("/", (req, res) => res.send("Hallo World"));

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
