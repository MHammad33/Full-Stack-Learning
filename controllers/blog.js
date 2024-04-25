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

router.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      console.log("Error fetching blog: ", error);
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

router.delete('/:id', (req, res) => {
  Blog
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      console.log("Error deleting blog: ", error);
    });
})

module.exports = router;