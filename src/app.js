import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/book.routes.js";
import bodyParser from "body-parser";
import { config } from "dotenv";

config();

// Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()); //Parseador de Bodies

// Aca conectaremos la base de datos
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;
app.use("/books", bookRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
