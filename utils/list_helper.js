const dummy = (blogs) => {
  // ...
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  }

  console.log(blogs);

  return blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes);
  return blogs.find(blog => blog.likes === Math.max(...likes));
}

const mostBlogs = (blogs) => {
  // Author with number of blogs
  const authorCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  let maxAuthor = "";
  let maxCount = 0;

  // Find author with most blogs
  for (const author in authorCount) {
    if (authorCount[author] > maxCount) {
      maxCount = authorCount[author];
      maxAuthor = author;
    }
  }

  // Return author with most blogs
  return {
    author: maxAuthor,
    blogs: maxCount
  }
}

const mostLikes = (blogs) => {
  // Author with number of likes
  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  let maxAuthor = "";
  let maxLikes = 0;

  // Find author with most likes
  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author];
      maxAuthor = author;
    }
  }

  // Return author with most likes
  return {
    "author": maxAuthor,
    "likes": maxLikes
  }

}



module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };