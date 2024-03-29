const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  // read the tagname from the params

  try {
    // let newTagName = decodeURIComponent(tagName)
    const postsByTags = await getPostsByTagName(tagName);
    
    console.log(postsByTags, "this is post by tag");

    // adding filter to  filter out any posts which are both inactive and not owned by the current user...
    const visiblePosts = postsByTags.filter(post => {
      return post.active || (req.user && post.author.id === req.user.id);
    });

    console.log(tagName, "newtagname");
    
    res.send({ postsByTags: postsByTags });
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message });
  }
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

module.exports = tagsRouter;
