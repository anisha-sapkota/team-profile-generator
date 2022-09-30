const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, email, id, officeNumber) {
    super(name, email, id);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber = () => this.officeNumber;
  getRole = () => "Manager";
}

module.exports = Manager;
