// import required libraries
const inquirer = require("inquirer");
const fs = require("fs");

// import classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// import template
const template = require("./src/template");

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
      // function for validating email
      validate: (email) => {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (valid) {
          return true;
        } else {
          return "Please enter a valid email address";
        }
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

// creates a file with fileName and data provided in parameters
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) =>
    err ? console.log(err) : console.log(`Successfully generated ${fileName}!`)
  );
};

// function for returning icon based on the role
const getIcon = (role) => {
  switch (role) {
    case "Manager":
      return '<i class="bi bi-cup-hot"></i>';
    case "Engineer":
      return '<i class="bi bi-sunglasses"></i>';
    case "Intern":
      return '<i class="bi bi-mortarboard-fill"></i>';
    default:
      return "";
  }
};

// function for returning unique info of each employee type
const getAdditionalInfo = (employee) => {
  if (employee.getRole() === "Manager") {
    return `Office number: ${employee.getOfficeNumber()}`;
  } else if (employee.getRole() === "Engineer") {
    return `GitHub: <a class="text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a>`;
  } else {
    return `School: ${employee.getSchool()}`;
  }
};

// function for generating the html template
const generateTemplate = (employees) => {
  let cards = "";
  for (const employee of employees) {
    const role = employee.getRole();
    const heading = `${employee.getName()} - ${getIcon(role)} ${role}`;
    const id = employee.getId();
    const email = employee.getEmail();
    const additional = getAdditionalInfo(employee);
    cards += template.card(heading, id, email, additional);
  }

  const htmlTemplate = template.html(cards);
  writeToFile("dist/index.html", htmlTemplate);
};

// initialization function
const init = async () => {
  // employees array
  const employees = [];

  // get manager's details
  let data = await inquirer.prompt(getQuestions("team manager"));
  // create new manager and push it to employees array
  employees.push(new Manager(data.name, data.email, data.id, data.phone));

  // boolen for adding more team members
  let moreMembers = true;

  do {
    // prompt for additional team members
    data = await inquirer.prompt([additionalMemberQuestion]);

    // if Engineer is chosen - ask for engineer details
    if (data.type === "Engineer") {
      data = await inquirer.prompt(getQuestions("engineer"));
      employees.push(new Engineer(data.name, data.email, data.id, data.github));
    } else if (data.type === "Intern") {
      // ask for intern details
      data = await inquirer.prompt(getQuestions("intern"));
      employees.push(new Intern(data.name, data.email, data.id, data.school));
    } else {
      // no more members
      moreMembers = false;
    }
  } while (moreMembers);

  // call function to generate template using the collected information
  generateTemplate(employees);
};

init();
