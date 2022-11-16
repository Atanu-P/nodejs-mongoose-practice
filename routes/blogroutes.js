// route for adding data to mongo db
const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const blogcontroller = require("../controllers/blogcontroller");

/* router.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 3",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}); */

// route for fetching data from mongo db
/* router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}); */

// route for fetching single data from mongo db
/* router.get("/single-blog", (req, res) => {
  Blog.findById("636e0291d69742ecb298c9a2")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
}); */

// route for get all blogs by desc
router.get("/", blogcontroller.get_all_blogs);

// route for create blog form
router.get("/create", blogcontroller.create_blog_form);

// route for post new blog
router.post("/", blogcontroller.post_new_blog);

// route for get and render specific blog
router.get("/:id", blogcontroller.get_post_detail);

// route for delete specific blog by id
router.delete("/:id", blogcontroller.delete_post);

// route for update blog form
router.get("/update/:id", blogcontroller.update_blog_form);

// route for post update blog
router.post("/update/:id", blogcontroller.post_update_blog);

module.exports = router;
