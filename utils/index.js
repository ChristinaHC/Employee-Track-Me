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
    const sql = `SELECT roles.*, department.department_name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id;`;

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
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`
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
const viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = role.id LEFT JOIN department on roles.department_id = department.id
    LEFT JOIN employee manager on manager.id = employee.manager_id;`

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

// Add an employee to the table
const addEmployee = answers => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`
    const params = [ansers[0].firstName, answers[0].lastName, answers[1].role, answers[2].manager];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            viewEmployees();
        }
    });
};

// Inquirer prompts for adding an employee
const newEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter new employee's first name!",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Please enter a first name for the new employee!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter new employee's last name!",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter a last name for the new employee!");
                    return false;
                }
            }
        }
    ]).then((name) => {
        answers = [{ firstName: name.firstName, lastName: name.lastName }]
        const sqlRoles = `SELECT roles.title, roles.id FROM roles;`;

        db.query(sqlRoles, (err, data) => {
            if (err) {
                console.log(err)
                return;
            }
            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: "list",
                    name: "role",
                    message: "Plese select which role applys to this employee.",
                    choices: roles
                }
            ]).then(rolesResult => {
                const roles = { roles: rolesResult.roles };
                answers.push(roles);
                const sqlMan = `SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL;`
                db.query(sqlMan, (err, data) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));;
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "Please select the manager in charge of this employee!",
                            choices: managers
                        }
                    ]).then(manResult => {
                        const manager = { manager: manResult.manager };
                        answers.push(manager);
                        addEmployee(answers);
                    })
                });
            });
        });
    });
};

// Update an existing employee
const updateEmployee = answers => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [answers[1].role, answers[0].employee];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            viewEmployees();
        }
    });
};

// Inquirer prompts for updating an existing employee


// Inquirer menu prompts







module.exports = { viewDepartment, newDepartment, viewRole, newRole, viewEmployees, newEmployee, updateEmployee };