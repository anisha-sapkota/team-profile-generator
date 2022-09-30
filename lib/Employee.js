class Employee {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  getName = () => this.name;
  getEmail = () => this.email;
  getId = () => this.id;
  getRole = () => "Employee";
}

module.exports = Employee;
