import http from "node:http";
import { json } from "./json.js";
import { routers } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const router = routers.find((router) => {
    return router.method === method && router.path === url;
  });

  if (router) {
    return router.handler(req, res);
  }
  return res.writeHead(404).end();
});

server.listen(4444);
