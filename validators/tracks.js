const { check } = require ("express-validator");
const validationResults = require ("../utils/handleValidator")
// Crear un objeto por cada middleware que se vaya a utilizar

/**
 * Se debe guiar del modelo
 */
const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty(),
    //Si se quiere tener una longitud específica: .isLength({min:3, max:90})
    check("album")
    .exists()
    .notEmpty(),

    check("cover")
    .exists()
    .notEmpty(),
    check("artist.name")
    .exists()
    .notEmpty(),

    check("artist.nickname")
    .exists()
    .notEmpty(),

    check("artist.nationality")
    .exists()
    .notEmpty(),

    check("cover")
    .exists()
    .notEmpty(),

    check("duration.start")
    .exists()
    .notEmpty(),

    check("duration.end")
    .exists()
    .notEmpty(),

    check("mediaId")
    .exists()
    .notEmpty()
    .isMongoId(),

    (req, res, next) => {
        return validationResults(req, res, next)
    }
    
]

module.exports = { validatorCreateItem }