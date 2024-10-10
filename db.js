const postgres = require("postgres");

sql = postgres('postgres://postgres:admin@localhost:5432/UPR-Core');

module.exports = sql;

