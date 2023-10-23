const mongoose = require ("mongoose");

const Userschema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:["user", "admin"],
        default: "user"
    }

    },{
        timestamps:true, //marcas de tiempo(TODO createdAt, updatedAt)
        versionKey:false
    }
    );

module.exports = mongoose.model("users", Userschema)

//module.exports = mongoose.model("___", Userschema)
//En los guiones bajos va el nombre de la colección (tabla)