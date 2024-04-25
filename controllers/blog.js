const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
})

router.post('/', async (req, res) => {
  console.log(req.body);

  if (!req.body.title || !req.body.url) {
    return res.status(400).json({
      error: "Title or URL missing"
    });
  }

  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
})

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
})

module.exports = router;