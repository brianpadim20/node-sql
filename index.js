require("dotenv").config()

const express = require("express"); //Ayuda a levantar un servicio web
const cors = require("cors"); /*Se le dice a la aplicación siendo instanciada que haga uso de cors para evitar
error de origen cruzado entre los navegadores*/
const dbConnect = require('./config/mongo')
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 3000;

/**
 * Aquí se invocarán a las rutas
 */

app.use("/api",require("./routes"))

//Función inicial, para que escuche por el puerto 3000 y retorne un mensaje o funcionalidad
app.listen(port,() =>{ 
    console.log('Tu app conectada por la dirección: http://localhost:'+port)

})

dbConnect() 