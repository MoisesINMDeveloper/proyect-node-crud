import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  gender: String,
  publication_date: String,
});

export default mongoose.model("Book", bookSchema);
