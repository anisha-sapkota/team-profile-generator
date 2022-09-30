import Employee from "./Employee";

export default class Manager extends Employee {
  constructor(name, email, id, officeNumber) {
    super(name, email, id);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber = () => this.officeNumber;
  getRole = () => "Manager";
}
