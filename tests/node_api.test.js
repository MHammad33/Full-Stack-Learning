const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert")
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);


const blogs = [
  {
    "_id": "5a422aa71b54a676234d17f8", "title": "Go To Statement Considered Harmful", "author": "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", "likes": 5, "__v": 0
  },
  {
    "_id": "5a422b3a1b54a676234d17f9", "title": "Canonical string reduction", "author": "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", "likes": 12, "__v": 0
  }
]

// Delete previous blogs and add new ones
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(blogs[0]);
  await blogObject.save();
  blogObject = new Blog(blogs[1]);
  await blogObject.save();
});


test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
})

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, blogs.length);
})

test("the first blog is about Statement Harmful", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map(blog => blog.title);
  assert(contents.includes("Go To Statement Considered Harmful"));
})

after(() => {
  mongoose.connection.close();
})