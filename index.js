// import inquirer library
const inquirer = require("inquirer");

// import classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// employees array
const employees = [];

// function for returning questions for a given employee type
const getQuestions = (employeeType) => {
  const questions = [
    {
      type: "input",
      message: `What is the ${employeeType}'s name?`,
      name: "name",
    },
    {
      type: "input",
      message: `What is the ${employeeType}'s employee id?`,
      name: "id",
    },
    {
      type: "input",
      message: `What is the ${employeeType}'s email address?`,
      name: "email",
      validate: (email) => {
        // Regex mail check (return true if valid mail)
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
          email
        );
      },
    },
  ];

  switch (employeeType) {
    case "team manager":
      questions.push({
        type: "input",
        message: `What is the ${employeeType}'s office number?`,
        name: "phone",
      });
      break;
    case "engineer":
      questions.push({
        type: "input",
        message: `What is ${employeeType}'s GitHub username?`,
        name: "github",
      });
      break;
    case "intern":
      questions.push({
        type: "input",
        message: `What is ${employeeType}'s school name?`,
        name: "school",
      });
    default:
      break;
  }
  return questions;
};

// question for adding additional team member
const additionalMemberQuestion = {
  type: "list",
  message: "Which type of team member would you like to add?",
  name: "type",
  choices: ["Engineer", "Intern", "I don't want to add any more team members"],
};

// initialization function
const init = async () => {
  // get manager's details
  let data = await inquirer.prompt(getQuestions("team manager"));
  // create new manager and push it to employees array
  employees.push(new Manager(data.name, data.email, data.id, data.phone));

  // boolen for adding more team members
  let moreMembers = true;

  do {
    // prompt for additional team members
    data = await inquirer.prompt([additionalMemberQuestion]);

    if (data.type === "Engineer") {
      data = await inquirer.prompt(getQuestions("engineer"));
      employees.push(new Engineer(data.name, data.email, data.id, data.github));
    } else if (data.type === "Intern") {
      data = await inquirer.prompt(getQuestions("intern"));
      employees.push(new Intern(data.name, data.email, data.id, data.school));
    } else {
      moreMembers = false;
    }
  } while (moreMembers);
};

init();
