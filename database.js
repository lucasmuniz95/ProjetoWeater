import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "TestDatabase.db";
const database_version = "1.0";
const database_displayname = "SQLite Test Database";
const database_size = 200000;

let db;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size
    )
      .then((DB) => {
        db = DB;
        console.log("Database OPEN");
        resolve(DB);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const closeDatabase = () => {
  if (db) {
    console.log("Closing DB");
    db.close()
      .then((status) => {
        console.log("Database CLOSED");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("Database was not OPENED");
  }
};

export const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)",
        []
      )
        .then(() => {
          console.log("Table created successfully");
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  });
};

export const insertUser = (name, age) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO Users (name, age) VALUES (?, ?)", [name, age])
        .then(([tx, results]) => {
          console.log("User added successfully");
          resolve(results);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Users", [])
        .then(([tx, results]) => {
          let users = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            users.push(row);
          }
          resolve(users);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  });
};
