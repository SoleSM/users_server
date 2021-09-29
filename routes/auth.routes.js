const router = require('express').Router();
const {check} = require('express-validator');
const{validarCampos}= require('../helpers/validacionCampos');
const { login } = require('../controllers/auth.controllers');

router.post('/login',[
    check('username', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    validarCampos
] ,login)


module.exports = router;