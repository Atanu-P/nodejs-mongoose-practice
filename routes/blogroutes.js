// route for adding data to mongo db
const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

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
router.get("/", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blog_result) => {
      res.render("index", { title: "All blogs", blogs: blog_result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// route for create
router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// route for post new blog
router.post("/", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// route for get and render specific blog
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// route for delete specific blog by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      // send redirection link to client side after deleting
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
