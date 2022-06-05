const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find(username);
  if (!user) return response.status(400).json({ error: "User not found" });
  request.user = user;
  next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const user = {
    name,
    username,
    id: uuidv4(),
    todos: [],
  };
  users.push(user);
  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.status(200).json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;
  const todo = {
    title,
    id: uuidv4(),
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };
  user.todos.push(todo);
  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  // const { user } = request;
  // const todo = {
  //   title,
  //   id: uuidv4(),
  //   done: false,
  //   deadline: new Date(deadline),
  //   created_at: new Date(),
  // };
  // user.todos.push(todo);
  return response.status(201).json({ title, deadline });
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
