const db = require("../db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { nextTick } = require("process");

// View department table
const viewDepartment = () => {
    const sql = `SELECT * from department;`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            return;
        }
        const table = cTable.getTable(results);
        console.log(table);
        next();
    }); 
};

// Add a department to table
const addDepartment = (newDepartment) => {
    const sql = `INSERT INTO department (dept_name) VALUES (?);`
    const params = [newDepartment.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            viewDepartment();
        }
    });
};

// Inquirer prompts for adding a department
const newDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the name of the new department!",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a name for the new department!");
                    return false;
                }
            }
        }
    ]).then(addDepartment);
};

// View role and department table together
const viewRole = () => {
    const sql = `SELECT role.*, department.department_name AS department FROM role LEFT JOIN department ON role.department_id = department.id;`;

    db.query()(sql, (err, results) => {
        if (err) {
            console.log(err)
            return;
        }
        const table = cTable.getTable(results);
        console.log(table);
        next();
    });
};

// Add a role to the table
const addRole = newRole => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`
    const params = [newRole.title, newRole.salary, newRole.department]

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            viewRole();
        }
    });
};

// Inquirer prompts for adding a role
const newRole = () => {
    const sql = `SELECT department.department_name, department.id FROM department`;

    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return;
        }

        const department = data.map(({ id, department_name }) => ({ name: department_name, value: id}));
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter title of the new role!",
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log("Please enter a title for the new role!");
                        return false;
                    }
                }
            },
            {
                type: "number",
                name: "salary",
                message: "Please enter the annual salary for the new role!",
                validate: salaryInput => {
                    if (salaryInput ) {
                        return true;
                    } else {
                        console.log("Please enter the role's annual salary!");
                        return false;
                    }
                }
            },
            {
                type: "list",
                name: "department",
                message: "Please input what department this role is assigned to!",
                choices: department
            }
        ]).then(addRole);
    });
};

// View employee, role, and department tables together


// Add an employee to the table


// Inquirer prompts for adding an employee


// Update an existing employee


// Inquirer prompts for updating an existing employee


// Inquirer menu prompts







module.exports = { viewDepartment, newDepartment, viewRole, newRole, viewEmployees, newEmployee, updateEmployee };