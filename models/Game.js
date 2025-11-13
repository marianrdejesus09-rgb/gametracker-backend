import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    plataforma: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      default: "",
    },
    progreso: {
      type: String,
      enum: ["No iniciado", "Jugando", "Completado"],
      default: "No iniciado",
    },
    calificacion: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    fechaAgregado: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Game = mongoose.model("Game", gameSchema);
export default Game;
