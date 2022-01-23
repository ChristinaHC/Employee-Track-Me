const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Ichigo!NekoinABox",
        database: "employee_tracker"
    },
    console.log("Connected to the employee_tracker database!")
);

module.exports = db;