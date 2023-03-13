import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #database = {};
  #persist = () => {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  };

  SELECT = (table) => {
    return this.#database[table] ?? [];
  };

  INSERT = (table, data) => {
    const tableToInsert = this.#database[table];
    if (Array.isArray(tableToInsert)) {
      tableToInsert.push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  };

  DELETE = (table, id) => {
    if (Array.isArray(this.#database[table])) {
      const filteredTable = this.#database[table].filter(
        (row) => row.id !== id
      );
      this.#database[table] = filteredTable;
    }
  };
}
