const mongoose = require ("mongoose");

const TracksSchema = new mongoose.Schema({
    name:{
        type:String
    },
    album:{
        type:String
    },
    cover:{
        type:String,
        validate:{
            validator: (req) => {
                return true;
                /**
                 * Validación para cuando se ingrese un dato, se le diga a la base de datos a ver si cumple un patrón
                 * Cuando la url no sea url devuelva un error
                 */

            },
            message: "ERROR_URL",
        },

    },
    artist:{ //Tipo de dato que está compuesto por otros tipos de datos
        name:{
            type:String,

        },
        nickname:{
            type:String,

        },
        nationality:{
            type:String,

        },

    },
    duration:{
        start:{
            type:Number,

        },
        end:{
            type:Number
        },

    },
    mediaId:{
        type:mongoose.Types.ObjectId, /*Quiere decir que no será un simple string que debe conformar
        un cierto patrón de número de caracteres, una estructura de como son los ID en Mongo
        */
    },

},{
        timestamps:true, //marcas de tiempo(TODO createdAt, updatedAt)
        versionKey:false
    }
    );

module.exports = mongoose.model("tracks", TracksSchema)