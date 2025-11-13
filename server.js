import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Asegúrate de que esta línea esté así:
app.use("/api/games", gameRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/gametracker")

  .then(() => console.log("MongoDB conectado ✅"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
