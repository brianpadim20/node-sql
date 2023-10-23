const { tracksModel } = require('../models')

// Obtener lista de la base de datos
const getItems= async (req,res)=>{
    const data = await tracksModel.find({})

    res.send({ data })
};
//Obtener un detalle
const getItem=(req,res)=>{

};
// Crear un registro
const createItem=async(req,res)=>{
    const body = req.body;
    console.log(body);
    const data = await tracksModel.create(body)
    res.send({data})

};
// Actualizar un registro
const updateItem=(req,res)=>{

};
// Eliminar un registro
const deleteteItem=(req,res)=>{

};

module.exports={ getItems,getItem,createItem,updateItem,deleteteItem }

