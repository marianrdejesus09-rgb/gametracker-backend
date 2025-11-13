import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

// ----------------------
// RUTA DE PRUEBA
// ----------------------
router.get("/", (req, res) => {
  res.json({ message: "Ruta de juegos funcionando correctamente 🎮" });
});

// ----------------------
// CREAR UN JUEGO
// ----------------------
router.post("/create", async (req, res) => {
  const { titulo, genero, plataforma, descripcion, fechaLanzamiento } = req.body;

  if (!titulo || !genero || !plataforma) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const newGame = new Game({ titulo, genero, plataforma, descripcion, fechaLanzamiento });
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------
// LEER TODOS LOS JUEGOS
// ----------------------
router.get("/all", async (req, res) => {
  try {
    const games = await Game.find().sort({ _id: -1 }); // Los más recientes primero
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------
// LEER UN JUEGO POR ID
// ----------------------
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: "Juego no encontrado" });
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------
// ACTUALIZAR UN JUEGO POR ID
// ----------------------
router.put("/update/:id", async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Devuelve el juego actualizado
    );
    if (!updatedGame) return res.status(404).json({ error: "Juego no encontrado" });
    res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------
// BORRAR UN JUEGO POR ID
// ----------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) return res.status(404).json({ error: "Juego no encontrado" });
    res.status(200).json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
