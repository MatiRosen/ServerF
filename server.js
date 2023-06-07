import express from "express";
import RouterProductos from "./router/productos.js";
import config from "./config.js";
import CnxMongo from "./model/DBMongo.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", new RouterProductos().start());

if (config.MODO_PERSISTENCIA === "MONGODB") await CnxMongo.conectar();

const PORT = config.PORT;
const server = app.listen(PORT, () =>
    console.log(`Servidor HTTP express escuchando en http://localhost:${PORT}`)
);

server.on("error", (error) =>
    console.log(`Error en servidor: ${error.message}`)
);
