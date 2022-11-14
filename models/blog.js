const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// new blog schema created
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// new blog mofdel created
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
