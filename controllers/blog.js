const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs);
    })
    .catch(error => {
      console.log("Error fetching blogs: ", error);
    });
})

router.post('/', (req, res) => {
  console.log(req.body);

  if (!req.body.title || !req.body.url) {
    return res.status(400).json({
      error: "Title or URL missing"
    });
  }

  const blog = new Blog(req.body);
  blog
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      console.log("Error saving blog: ", error);
    });
})

module.exports = router;