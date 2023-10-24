const multer = require ("multer");

/**
 * Primero decirle a multer que haga uso del método disco de almacenamiento, donde se le pasará una
 * configuración como objeto.
 * 
 * Dentro de diskStorage (disco de almacenamiento) irán 2 funciones: destination y filename
 * 
 * - Destination recibe como parámetros request, file, una función callback
 */

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        // La ruta de almacenamiento es este directorio, retrocede una carpeta y que lo guarde en la carpeta storage
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)

    },filename:function(req, file, cb){
        /**Los archivos tienen una extensión, lo primero que se hará es sacarla */
        const ext = file.originalname.split(".").pop()//Devuelve ["name","extensión"], .pop() para coger el último valor
        const filename = `file-${Date.now()}.${ext}` //Devuelve la marca de tiempo actual en formato unix 
        
        cb(null,filename)

    }

})

// Uso del middleware
const uploadMiddleware = multer({
    storage:storage

})

module.exports = uploadMiddleware;