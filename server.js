import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import gameRoutes from "./routes/gameRoutes.js"; // tus rutas

const app = express();
app.use(express.json());

// --- Rutas ---
app.use("/api/games", gameRoutes);

// --- Conexión a MongoDB en memoria ---
async function startServer() {
  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB en memoria listo ✅");

    // --- Iniciar servidor ---
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

// --- Arrancar todo ---
startServer();
