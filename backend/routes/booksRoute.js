import express from "express";
import {Book} from '../models/bookModel.js';
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publicationYear) {
      return res.status(400).send("All input is required");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publicationYear) {
      return res.status(400).send("All input is required");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;