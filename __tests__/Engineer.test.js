const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  const bob = new Engineer("Bob", "bob@example.com", 2, "bob-gh");

  test("getName returns the name of the engineer", () => {
    expect(bob.getName()).toBe("Bob");
  });

  test("getEmail returns the email of the engineer", () => {
    expect(bob.getEmail()).toBe("bob@example.com");
  });

  test("getId returns the id of the engineer", () => {
    expect(bob.getId()).toBe(2);
  });

  test("getRole returns Engineer", () => {
    expect(bob.getRole()).toBe("Engineer");
  });

  test("getGithub returns the github username of the engineer", () => {
    expect(bob.getGithub()).toBe("bob-gh");
  });
});
