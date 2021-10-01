const { validationResult } = require('express-validator');

const validarCampos = async (req, res, next) => {
    const errores = await validationResult(req);

if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
}
    next();
}

module.exports = {validarCampos};