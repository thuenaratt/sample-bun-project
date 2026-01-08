const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./room_rental.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_number TEXT,
      price INTEGER,
      is_available INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tenants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      room_id INTEGER,
      start_date TEXT,
      duration_months INTEGER
    )
  `);
});

module.exports = db;
