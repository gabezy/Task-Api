import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildPath } from "./utils/buildPath.js";

const database = new Database();

export const routers = [
  {
    method: "GET",
    path: buildPath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const query = search
        ? {
            title: search,
            description: search,
          }
        : null;

      const tasks = database.select("tasks", query);
      if (query && Object.keys(tasks).lenght == 0)
        return res.writeHead(404).end("Registro-não-existe");

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildPath("/tasks"),
    handler: (req, res) => {
      try {
        const { title, description } = req.body;
        if (!title.lenght === 0 || !description.lenght === 0) {
          return res.writeHead(400).end();
        }

        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: null,
        };
        database.insert("tasks", task);

        return res.writeHead(201).end();
      } catch {
        return res.writeHead(400).end();
      }
    },
  },
  {
    method: "PATCH",
    path: buildPath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      database.complete("tasks", id);

      return res.writeHead(200).end();
    },
  },
  {
    method: "PUT",
    path: buildPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedTask = {
        title,
        description,
        updated_at: new Date().toISOString(),
      };

      database.update("tasks", id, updatedTask);

      return res.writeHead(200).end();
    },
  },

  {
    method: "DELETE",
    path: buildPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(200).end();
    },
  },
];
