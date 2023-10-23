const express = require ("express");
const fs = require("fs")
const router = express.Router();

const PATH_ROUTES=__dirname;/**Constante de node que da la ruta absoluta el path donde se encuentra el archivo */

const removeExtension = (fileName)=>{
    return fileName.split('.').shift(); //retorna [tracks,js]

}

fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = removeExtension(file);//Puede que llegue index o tracks
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`));//http://localhost:3300/api/ruta
    }

});


module.exports=router