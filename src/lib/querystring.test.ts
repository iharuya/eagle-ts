import { assertEquals } from "jsr:@std/assert";
import { type HTTPQuery, queryString } from "./querystring.ts";

Deno.test("queryString function - empty object", () => {
  const input: HTTPQuery = {};
  assertEquals(queryString(input), "");
});

Deno.test("queryString function - single string value", () => {
  const input: HTTPQuery = { name: "John Doe" };
  assertEquals(queryString(input), "name=John%20Doe");
});

Deno.test("queryString function - single number value", () => {
  const input: HTTPQuery = { age: 30 };
  assertEquals(queryString(input), "age=30");
});

Deno.test("queryString function - single boolean value", () => {
  const input: HTTPQuery = { isActive: true };
  assertEquals(queryString(input), "isActive=true");
});

Deno.test("queryString function - null and undefined values", () => {
  const input: HTTPQuery = { nullValue: null, undefinedValue: undefined };
  assertEquals(queryString(input), "");
});

Deno.test("queryString function - Date object", () => {
  const date = new Date("2023-01-01T00:00:00Z");
  const input: HTTPQuery = { createdAt: date };
  assertEquals(queryString(input), "createdAt=2023-01-01T00%3A00%3A00.000Z");
});

Deno.test("queryString function - array of strings", () => {
  const input: HTTPQuery = { tags: ["javascript", "typescript"] };
  assertEquals(queryString(input), "tags=javascript&tags=typescript");
});

Deno.test("queryString function - array of numbers", () => {
  const input: HTTPQuery = { scores: [85, 90, 95] };
  assertEquals(queryString(input), "scores=85&scores=90&scores=95");
});

Deno.test("queryString function - Set of values", () => {
  const input: HTTPQuery = { uniqueTags: new Set(["js", "ts"]) };
  assertEquals(queryString(input), "uniqueTags=js&uniqueTags=ts");
});

Deno.test("queryString function - multiple key-value pairs", () => {
  const input: HTTPQuery = { name: "Alice", age: 25, isStudent: true };
  assertEquals(queryString(input), "name=Alice&age=25&isStudent=true");
});

Deno.test("queryString function - special characters in keys and values", () => {
  const input: HTTPQuery = {
    "user name": "John & Jane",
    "email@example.com": "test+user@example.com",
  };
  assertEquals(
    queryString(input),
    "user%20name=John%20%26%20Jane&email%40example.com=test%2Buser%40example.com",
  );
});

Deno.test("queryString function - mixed types", () => {
  const input: HTTPQuery = {
    name: "John",
    age: 30,
    isStudent: false,
    courses: ["Math", "Science"],
    lastLogin: new Date("2023-01-01T00:00:00Z"),
  };
  assertEquals(
    queryString(input),
    "name=John&age=30&isStudent=false&courses=Math&courses=Science&" +
      "lastLogin=2023-01-01T00%3A00%3A00.000Z",
  );
});

Deno.test("queryString function - empty string values", () => {
  const input: HTTPQuery = { emptyString: "" };
  assertEquals(queryString(input), "emptyString=");
});

Deno.test("queryString function - zero as a value", () => {
  const input: HTTPQuery = { count: 0 };
  assertEquals(queryString(input), "count=0");
});

Deno.test("queryString function - prefix for top-level keys", () => {
  const input: HTTPQuery = { name: "John", age: 30 };
  assertEquals(
    queryString(input, "user"),
    "user%5Bname%5D=John&user%5Bage%5D=30",
  );
});

Deno.test("queryString function - prefix with array values", () => {
  const input: HTTPQuery = { tags: ["javascript", "typescript"] };
  assertEquals(
    queryString(input, "post"),
    "post%5Btags%5D=javascript&post%5Btags%5D=typescript",
  );
});

Deno.test("queryString function - prefix with mixed types", () => {
  const input: HTTPQuery = {
    name: "Alice",
    age: 25,
    isStudent: true,
    courses: ["Math", "Science"],
    lastLogin: new Date("2023-01-01T00:00:00Z"),
  };
  assertEquals(
    queryString(input, "user"),
    "user%5Bname%5D=Alice&user%5Bage%5D=25&user%5BisStudent%5D=true&" +
      "user%5Bcourses%5D=Math&user%5Bcourses%5D=Science&" +
      "user%5BlastLogin%5D=2023-01-01T00%3A00%3A00.000Z",
  );
});
