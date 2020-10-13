const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr = [];

// Write code to use inquirer to gather information about the development team members,
 let questions = [

  {
      type: "input",
      name: "name",
      message: "What is the employees name?"
    },
    {
      type: "list",
      message: "What is the employees role?",
      name: "role",
      choices: [
        "manager", 
        "engineer", 
        "intern", 
      ]
    },
    {
      type: "input",
      message: "What is the employees email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is the managers office number?",
      name: "OfficeNum",
      when: function(answers) {
        return answers.role === "manager"
      }
      
    },
    {
      type: "input",
      message: "Whats is the interns school?",
      name: "school",
      when: function(answers) {
        return answers.role === "intern"
      }
      
    },
    {
      type: "input",
      message: "What is the engineers github?",
      name: "gitHub",
      when: function(answers) {
        return answers.role === "engineer"
      }
      
    },
    {
    type: "confirm",
    message: "Do you want to add another employee?",
    name: "askAgain",
    default: true,
    },

  ]
function addEmployees() {
    inquirer.prompt(questions).then(answers=> {
      var person;
      if (answers.role === "manager") {
        person = new Manager(answers.name, Date.now(),answers.OfficeNum, answers.email);
      }else if (answers.role === "intern") {
        person = new Intern(answers.name, Date.now(),answers.school, answers.email);
      }else if (answers.role === "engineer") {
        person = new Engineer(answers.name, Date.now(),answers.gitHub, answers.email);
      };
      employeeArr.push(person);
      if (answers.askAgain) {
        addEmployees()
        
      }else {
        renderHtml()
        console.log("added employees")
      }
  
    });
  };
   addEmployees();   

   function renderHtml() {
     let html = render(employeeArr);
     fs.writeFile("./templates/team.html", html, function(err, data){
       if (err) 
       console.log(err);
     });

   };
            
