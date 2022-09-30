const Employee = require("../lib/Employee");

describe("Employee", () => {
  const john = new Employee("John", "john@email.com", 1);

  test("getName returns the name of the employee", () => {
    expect(john.getName()).toBe("John");
  });
});
