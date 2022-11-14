const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blog");

// express app
const app = express();

// connect to mongo db
const db_url =
  "mongodb+srv://node:node1234@test.7ydnwmm.mongodb.net/node?retryWrites=true&w=majority";
mongoose
  .connect(db_url)
  .then((result) => {
    console.log("connected db");

    // listen for requests
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// rout for adding data to mongo db
app.get("/add-blog", (req, res) => {
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
});

// rout for fetching data from mongo db
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// rout for fetching  single data from mongo db
app.get("/single-blog", (req, res) => {
  Blog.findById("636e0291d69742ecb298c9a2")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blog_result) => {
      res.render("index", { title: "All blogs", blogs: blog_result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// rout for post new blog
app.post("/blogs", (req, res) => {
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

// rout for get and render specific blog
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
