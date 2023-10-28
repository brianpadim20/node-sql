const express = require ("express");
const router = express.Router();//Función de express para manejar rutas
const { validatorCreateItem } = require("../validators/tracks")
const { getItems,getItem,createItem } = require("../controllers/tracks")

//Todo es http://localhost/tracks con métodos GET, POST, DELETE, PUT
router.get("/", getItems);
router.post("/", validatorCreateItem,createItem);

module.exports = router

