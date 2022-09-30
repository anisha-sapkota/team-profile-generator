import Employee from "./Employee";

export default class Engineer extends Employee {
  constructor(name, email, id, github) {
    super(name, email, id);
    this.github = github;
  }

  getGithub = () => this.github;
  getRole = () => "Engineer";
}
