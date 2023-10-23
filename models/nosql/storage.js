const mongoose = require ("mongoose");

const Storageschema = new mongoose.Schema({
    url:{
        type:String
    },
    filename:{
        type:String
    }

    },{
        timestamps:true, //marcas de tiempo(TODO createdAt, updatedAt)
        versionKey:false
    }
    );

module.exports = mongoose.model("storages", Storageschema)