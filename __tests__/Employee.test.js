const Employee = require("../lib/Employee");

describe("Employee", () => {
  const john = new Employee("John", "john@example.com", 1);

  test("getName returns the name of the employee", () => {
    expect(john.getName()).toBe("John");
  });

  test("getEmail returns the email of the employee", () => {
    expect(john.getEmail()).toBe("john@example.com");
  });

  test("getId returns the id of the employee", () => {
    expect(john.getId()).toBe(1);
  });

  test("getRole returns Employee", () => {
    expect(john.getRole()).toBe("Employee");
  });
});
