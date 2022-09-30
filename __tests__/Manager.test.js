const Manager = require("../lib/Manager");

describe("Manager", () => {
  const maria = new Manager("Maria", "maria@example.com", 7, "8888-8888");

  test("getName returns the name of the manager", () => {
    expect(maria.getName()).toBe("Maria");
  });

  test("getEmail returns the email of the manager", () => {
    expect(maria.getEmail()).toBe("maria@example.com");
  });

  test("getId returns the id of the manager", () => {
    expect(maria.getId()).toBe(7);
  });

  test("getRole returns Manager", () => {
    expect(maria.getRole()).toBe("Manager");
  });

  test("getOfficeNumber returns the office number of the manager", () => {
    expect(maria.getOfficeNumber()).toBe("8888-8888");
  });
});
