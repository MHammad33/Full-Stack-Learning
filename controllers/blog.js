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