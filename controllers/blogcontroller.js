const Blog = require("../models/blog");

// get all blogs by desc
const get_all_blogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blog_result) => {
      res.render("index", { title: "All blogs", blogs: blog_result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// create blog form
const create_blog_form = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

// post new blog
const post_new_blog = (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      // console.log(result);
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

// get and render specific blog
const get_post_detail = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "Blog not found" });
    });
};

// delete specific blog by id
const delete_post = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      // send redirection link to client side after deleting
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const update_blog_form = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      console.log(result);
      res.render("update", { blog: result, title: "Update Blog" });
      // res.json({ redirect: "/update", result: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const post_update_blog = (req, res) => {
  // console.log(req);
  const id = req.params.id;
  const update = req.body;

  Blog.findByIdAndUpdate(id, update)
    .then((result) => {
      console.log(result);
      res.redirect(`/blogs/${id}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "Blog not found" });
    });
};

module.exports = {
  get_all_blogs,
  create_blog_form,
  post_new_blog,
  get_post_detail,
  delete_post,
  update_blog_form,
  post_update_blog,
};
