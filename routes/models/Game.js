import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  descripcion: { type: String },
  fechaLanzamiento: { type: Date },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
