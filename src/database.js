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
  #hasTable = (table) => {
    return Array.isArray(table);
  };

  select = (table, search) => {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          // Object.entries(search) -> search {key: "value"} -> [["key", "value"]]      search = {title: "pular"} -> [["title", "pular"]]
          return row[key].toLowerCase().includes(value.toLowerCase());
          // row["title"].toLowerCase().includes("pular".toLowerCase())
        });
      });
    }

    return data;
  };

  insert = (table, data) => {
    const tableToInsert = this.#database[table];
    if (Array.isArray(tableToInsert)) {
      tableToInsert.push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  };

  update = (table, id, data) => {
    if (this.#hasTable(this.#database[table])) {
      const { title, description, updated_at } = data;
      this.#database[table].map((row) => {
        if (row.id === id) {
          row.title = title;
          row.description = description;
          row.updated_at = updated_at;
        }
      });
      this.#persist();
    }
  };

  delete = (table, id) => {
    if (Array.isArray(this.#database[table])) {
      const filteredTable = this.#database[table].filter(
        (row) => row.id !== id
      );
      this.#database[table] = filteredTable;
      this.#persist();
    }
  };

  complete = (table, id) => {
    if (this.#hasTable(this.#database[table])) {
      this.#database[table].map((row) => {
        if (row.id === id) {
          row.completed_at = new Date().toISOString();
        }
      });
      this.#persist();
    }
  };
}
