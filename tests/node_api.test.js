const { test, after } = require("node:test");
const assert = require("node:assert")
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
})

test("there are six blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 6);
})

test("the first blog is about React patterns", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map(blog => blog.title);
  assert(contents.includes("React patterns"));
})

after(() => {
  mongoose.connection.close();
})