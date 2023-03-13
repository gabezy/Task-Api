import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routers = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.SELECT("tasks");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: null,
      };
      database.INSERT("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: "/tasks/:id",
    handler: (req, res) => {},
  },
];
