const Intern = require("../lib/Intern");

describe("Intern", () => {
  const tom = new Intern("Tom", "tom@example.com", 3, "Sydney High School");

  test("getName returns the name of the intern", () => {
    expect(tom.getName()).toBe("Tom");
  });

  test("getEmail returns the email of the intern", () => {
    expect(tom.getEmail()).toBe("tom@example.com");
  });

  test("getId returns the id of the intern", () => {
    expect(tom.getId()).toBe(3);
  });

  test("getRole returns Intern", () => {
    expect(tom.getRole()).toBe("Intern");
  });

  test("getSchool returns the school of the intern", () => {
    expect(tom.getSchool()).toBe("Sydney High School");
  });
});
