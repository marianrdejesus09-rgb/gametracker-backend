import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  autor: { type: String, required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);
