const { storageModel } = require('../models')
const PUBLIC_URL = process.env.PUBLIC_URL;

// Obtener lista de la base de datos
const getItems= async (req,res)=>{
    const data = await storageModel.find({})

    res.send({ data })
};
//Obtener un detalle
const getItem=(req,res)=>{

};
// Crear un registro
const createItem=async(req,res)=>{
    const { body, file } = req;
    console.log(file);
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await storageModel.create(fileData)
    res.send({data})

};
// Actualizar un registro
const updateItem=(req,res)=>{

};
// Eliminar un registro
const deleteteItem=(req,res)=>{

};

module.exports={ getItems,getItem,createItem,updateItem,deleteteItem }

