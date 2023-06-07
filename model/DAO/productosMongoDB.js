import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongo {
    constructor() {}

    obtenerProductos = async (id) => {
        if (!CnxMongoDB.connection) return id ? {} : [];

        if (id) {
            const producto = await CnxMongoDB.db
                .collection("productos")
                .findOne({ _id: new ObjectId(id) });
            return producto;
        } else {
            const productos = await CnxMongoDB.db
                .collection("productos")
                .find({})
                .toArray();
            return productos;
        }
    };

    guardarProducto = async (producto) => {
        if (!CnxMongoDB.connection) return {};

        await CnxMongoDB.db.collection("productos").insertOne(producto);
        return producto;
    };

    // RECORDAR QUE EL ID LO CONVERTIAMOS A NUMBER EN EL CONTROLADOR, POR LO TANTO ACA HAY QUE CAMBIARLO A STRING, Y ARREGLAR LOS ERRORES EN MEM Y FILE EN UPDATE.
    actualizarProducto = async (id, producto) => {
        if (!CnxMongoDB.connection) return {};

        await CnxMongoDB.db
            .collection("productos")
            .updateOne({ _id: new ObjectId(id) }, { $set: producto });

        return await this.obtenerProductos(id);
    };

    eliminarProducto = async (id) => {
        if (!CnxMongoDB.connection) return {};

        const producto = await this.obtenerProductos(id);
        await CnxMongoDB.db
            .collection("productos")
            .deleteOne({ _id: new ObjectId(id) });

        return producto;
    };
}

export default ModelMongo;
