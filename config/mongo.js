const mongoose = require("mongoose");

const dbConnect = async () => {
    try{
        const DB_URI = process.env.DB_URI; 
        mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        console.log('**** Conexión establecida exitosamente ****')

    }catch (err){
        console.log('**** Error de conexión ****\n' + error)
    }

}
module.exports = dbConnect
