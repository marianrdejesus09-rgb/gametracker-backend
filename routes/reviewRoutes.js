import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Obtener todas las reseñas de un juego
router.get("/:juegoId", async (req, res) => {
  try {
    const reviews = await Review.find({ juegoId: req.params.juegoId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nueva reseña
router.post("/", async (req, res) => {
  try {
    const { juegoId, autor, texto } = req.body;
    const nuevaReview = new Review({ juegoId, autor, texto });
    const savedReview = await nuevaReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
