import Book from "../models/book.models.js";

// MIDDLEWARES
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;
  console.log(id);
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      message: "El id del libro no es valido",
    });
  }
  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "El libro no fue encontrado",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.book = book;
  next();
};
export default getBook;
