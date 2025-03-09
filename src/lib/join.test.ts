import { assertEquals } from "@std/assert";
import { join } from "./join.ts";

Deno.test("join function - basic concatenation", () => {
  assertEquals(
    join("/a/", "/b/", "/c"),
    "/a/b/c",
  );
  assertEquals(
    join("a/", "/b/", "/c/"),
    "a/b/c/",
  );
  assertEquals(
    join("a", "b", "c"),
    "a/b/c",
  );
  assertEquals(
    join("a", "b/c", "d/"),
    "a/b/c/d/",
  );
  assertEquals(
    join("/a/b/c", "d/"),
    "/a/b/c/d/",
  );
});

Deno.test("join function - empty string should be ignored", () => {
  assertEquals(
    join("", "a", "b"),
    "a/b",
  );
  assertEquals(
    join("a", "", "b"),
    "a/b",
  );
  assertEquals(
    join("a", "b", ""),
    "a/b",
  );
});

Deno.test("join function - HTTP URL concatenation", () => {
  assertEquals(
    join("http://localhost:1234", "path/to/resource"),
    "http://localhost:1234/path/to/resource",
  );
  assertEquals(
    join("https://example.com", "path/to/resource"),
    "https://example.com/path/to/resource",
  );
});
