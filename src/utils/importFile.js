import fs from "node:fs";
import { parse } from "csv-parse";

const filePath = new URL("../../import.csv", import.meta.url);

const postTask = async (task) => {
  try {
    const { title, description } = task;
    const data = JSON.stringify({ title, description });
    const options = { method: "POST", body: data };
    const response = await fetch("http://localhost:4444/tasks", options);
    console.log("Status:", response.ok);
  } catch {
    console.log("An Unexpected error. Please check the file");
  }
};

const parser = parse({ columns: true });
fs.createReadStream(filePath, "utf-8")
  .pipe(parser)
  .on("data", (task) => {
    postTask(task);
  })
  .on("end", () => {
    console.log("file imported");
  });

// OTHER WAY

// const readFile = async (filePath) => {
//   const buffers = [];
//   const file = await fs.readFile(filePath, "utf-8");
//   const data = file.split("\n");
//   data.shift();
//   data.pop();

//   for (const chunk of data) {
//     const [title, description] = chunk.split(",");
//     const json = {
//       title,
//       description,
//     };
//     buffers.push(json);
//   }
//   return buffers;
// };

// const importFile = async (pathFile) => {
//   const data = await readFile(pathFile);

//   for (const task of data) {
//     const { title, description } = task;
//     const res = await fetch("http://localhost:4444/tasks", {
//       method: "POST",
//       body: JSON.stringify({ title, description }),
//     });
//     console.log(res);
//   }
// };

// importFile(filePath);
