import express from "express";
import Book from "../models/book.models.js";
import getBook from "../middlewares/getBooks.js";

const router = express.Router();

//Obtener todo los libros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    console.log("GET ALL ", books);
    if (books.length === 0) {
      return res.status(204).json([]);
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo libro(recurso)
router.post("/", async (req, res) => {
  const { title, author, gender, publication_date } = req.body;
  if (!title || !author || !gender || !publication_date) {
    return res.status(400).json({
      message: "Los campos título, autor, género y fecha son obligatorios",
    });
  }
  const book = new Book({
    title,
    author,
    gender,
    publication_date,
  });
  try {
    const newBook = await book.save();
    console.log(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// OBTENER LIBRO POR ID
router.get("/:id", getBook, async (req, res) => {
  res.json(res.book);
});
// ACTUALIZAR LIBRO
router.put("/:id", getBook, async (req, res) => {
  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.gender = req.body.gender || book.gender;
    book.publication_date = req.body.publication_date || book.publication_date;
    const updateBook = await book.save();
    res.json(updateBook);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
// ACTUALIZAR LIBRO CON PATCH
router.patch("/:id", getBook, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.author &&
    !req.body.genger &&
    !req.body.publication_date
  ) {
    res.status(400).json({
      message:
        "Al menos uno de estos campos debe ser enviado, title, author, gender, publication_date",
    });
  }
  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.gender = req.body.gender || book.gender;
    book.publication_date = req.body.publication_date || book.publication_date;
    const updateBook = await book.save();
    res.json(updateBook);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// BORRAR LIBROS
router.delete("/:id", getBook, async (req, res) => {
  try {
    const book = res.book;
    await book.deleteOne({
      _id: book._id,
    });
    res.json({
      message: `El libro ${book.title} fue eliminado de manera exitosa`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
