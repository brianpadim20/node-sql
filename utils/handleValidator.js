const {validationResult} = require("express-validator")

const validationResults = (req, res, next) =>{
    try{
        validationResult(req).throw()//Valida lo que se está pasando por la petición, si no cumple ve al catch
        return next() //Continúa hacia el controlador
        
    } catch(err) {
        res.status(403)
        res.send({errors: err.array()})
        
    }

}

module.exports = validationResults