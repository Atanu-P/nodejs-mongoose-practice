const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blog");
const blogroutes = require("./routes/blogroutes");
require("dotenv").config();

// express app
const app = express();

// connect to mongo db
const db_url = process.env.MONGODB_URL;
mongoose
  .connect(db_url)
  .then((result) => {
    console.log("connected db");

    // listen for request
    const port = process.env.PORT || 3000;
    const base_url = process.env.BASE_URL || `http://localhost:${port}/`;
    app.listen(port, () => {
      console.log(`✓ Listening on Port:${port}. Visit ${base_url}`);
    });
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
