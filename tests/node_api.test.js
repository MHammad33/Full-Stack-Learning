const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert")
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);


/**
 * @dev Before each test, the database is cleared and two blogs are added to it.
 * @notice The initial blogs are added to the database using the Blog model.
*/
beforeEach(async () => {
  await Blog.deleteMany({});

  // @notice Promise array is created to save all the blogs in the database.
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  // @notice Promise array is resolved to save all the blogs in the database. 
  await Promise.all(promiseArray);
});


test("blogs are returned as json", async () => {
  console.log("test started");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
})

test("all blogs are returned", async () => {
  console.log("test started");
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

test("the first blog is about Statement Harmful", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map(blog => blog.title);
  assert(contents.includes("Go To Statement Considered Harmful"));
})

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "http://newblog.com",
    likes: 0
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();
  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);

  const titles = blogs.map(blog => blog.title);
  assert(titles.includes("New Blog"));
})

test("blog without title is not added", async () => {
  const newBlog = {
    author: "New Author",
    url: "http://newblog.com",
    likes: 0
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400);

  const blogs = await helper.blogsInDb();
  assert.strictEqual(blogs.length, helper.initialBlogs.length);

})

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
  assert.deepStrictEqual(resultBlog.body, processedBlogToView);
})

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(blog => blog.title);
  assert(!titles.includes(blogToDelete.title));
})

after(() => {
  mongoose.connection.close();
})