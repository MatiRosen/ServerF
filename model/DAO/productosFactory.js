import ModelFile from "./productosFile.js";
import ModelMem from "./productosMem.js";
import ModelMongo from "./productosMongoDB.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "MEM":
                console.log("**** Persistiendo en memoria ****");
                return new ModelMem();
            case "FILE":
                console.log("**** Persistiendo en File System ****");
                return new ModelFile();
            case "MONGODB":
                console.log("**** Persistiendo en MongoDB ****");
                return new ModelMongo();
            default:
                console.log("**** Persistiendo en Memoria (default) ****");
                return new ModelMem();
        }
    }
}

export default ModelFactory;
