const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blog");
const blogroutes = require("./routes/blogroutes");

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

// route redirect to /blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// route for about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// all the /blogs routes
app.use("/blogs", blogroutes);

// route for 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
