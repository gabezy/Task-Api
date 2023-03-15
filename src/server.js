import http from "node:http";
import { json } from "./json.js";
import { routers } from "./routes.js";
import { extrartQuery } from "./utils/extractQuery.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routers.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extrartQuery(query) : {};

    return route.handler(req, res);
  }
  return res.writeHead(404).end();
});

server.listen(4444);
