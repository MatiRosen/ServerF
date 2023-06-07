import fs from "fs";

class ModelFile {
    constructor() {
        this.nombreArchivo = "productos.json";
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    }

    async escribirArchivo(productos) {
        await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(productos, null, "\t")
        );
    }

    obtenerProductos = async (id) => {
        try {
            const productos = JSON.parse(await this.leerArchivo());
            if (id) {
                const producto = productos.find(
                    (producto) => producto.id == id
                );
                return producto || { error: "Producto no encontrado" };
            } else {
                return productos;
            }
        } catch {
            return id ? {} : [];
        }
    };

    guardarProducto = async (producto) => {
        let productos = [];
        try {
            productos = JSON.parse(await this.leerArchivo());
        } catch {}

        const id = (productos[productos.length - 1]?.id || 0) + 1;
        producto = { id, ...producto };
        productos.push(producto);

        await this.escribirArchivo(productos);
        return producto;
    };

    actualizarProducto = async (id, producto) => {
        let productos = [];
        try {
            productos = JSON.parse(await this.leerArchivo());
        } catch {}

        producto.id = id;
        const indice = productos.findIndex((producto) => producto.id == id); // HAY QUE SACARLE EL === PORQUE EL ID VIENE COMO STRING Y EL ID DEL PRODUCTO COMO NUMBER

        if (indice != -1) {
            const productoAnterior = productos[indice];
            const productoNuevo = { ...productoAnterior, ...producto };

            productos.splice(indice, 1, productoNuevo);
            await this.escribirArchivo(productos);

            return productoNuevo;
        } else {
            productos.push(producto);
            await this.escribirArchivo(productos);

            return producto;
        }
    };

    eliminarProducto = async (id) => {
        let productos = [];
        try {
            productos = JSON.parse(await this.leerArchivo());
        } catch {}

        const indice = productos.findIndex((producto) => producto.id == id);
        let producto;

        if (indice != -1) {
            producto = productos.splice(indice, 1)[0];
        }

        await this.escribirArchivo(productos);
        return producto;
    };
}

export default ModelFile;
