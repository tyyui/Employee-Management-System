const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "DBpassword",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee roles",
        "Exit...",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View department":
          viewDepartment();
          break;

        case "View role":
          viewRole();
          break;

        case "View employee":
          viewEmployee();
          break;

        case "Update employee roles":
          updateEmployeeRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM employeeDB.departments", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
  runSearch();
}

function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What will you name the new department?",
    })
    .then(function (answer) {
      var query = "INSERT INTO employeeDB.departments SET ?";
      connection.query(query, { name: answer.name }, function (err, res) {
        if (err) throw err;
        viewDepartment();
      });
    });
}

function viewRole() {
  connection.query("SELECT * FROM employeeDB.roles", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
  runSearch();
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What will you title the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What will the roles salary be?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "department_id",
        type: "input",
        message: "Which department will the hold this role?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
    ])
    .then(function (answer) {
      var query = "INSERT INTO employeeDB.roles SET ?";
      connection.query(
        query,
        {
          title: answer.title,
          salary: parseInt(answer.salary),
          department_id: parseInt(answer.department_id),
        },
        function (err, res) {
          if (err) throw err;
          viewRole();
        }
      );
    });
}

function viewEmployee() {
  connection.query("SELECT * FROM employeeDB.employees", function (err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
  runSearch();
}