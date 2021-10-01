const router = require('express').Router();
const { rutaGet, rutaPost, rutaPut, rutaDelete }= require('../controllers/users.controllers');
const {check} = require('express-validator');
const {validarCampos}= require('../middlewares/validacionCampos');
const {ExisteRole, ExisteUsername} = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validar-jwt');
const{ tieneRol }= require('../middlewares/validar-roles');


router.get('/getUser',
[ validarJWT, 
tieneRol('ADMIN', 'COLABORADOR')],
rutaGet);

router.post('/postUser', 
//validaciones username
[
validarJWT,
tieneRol('ADMIN', 'COLABORADOR'),
check('username', 'el username es requerido').not().isEmpty(),
check('username', 'el username debe tener un minimo de 7 caracteres ').isLength({min: 7}),
check('username').custom(ExisteUsername),

//validaciones password
check('password', 'La contraseña es requerida').not().isEmpty(),
check('password', 'La contraseña debe tener un minimo de 8 caracteres').isLength({min: 8}),

//validacion telefono
check('telefono', 'El telefono no es valido').not().isEmpty().isNumeric(),

//validaciones roles
check('role', 'El rol es requerido').not().isEmpty(),
check('role').custom(ExisteRole)
, validarCampos]
,rutaPost);





router.put('/editUser/:id', 
//validaciones username
[validarJWT, tieneRol('ADMIN'),
check('username', 'el username es requerido').not().isEmpty(),
check('username', 'el username debe tener un minimo de 7 caracteres ').isLength({min: 7}),

//validaciones password
check('password', 'La contraseña es requerida ').not().isEmpty(),
check('password', 'La contraseña debe tener un minimo de 8 caracteres').isLength({min: 8}),

//validacion telefono
check('telefono', 'El telefono no es valido').not().isEmpty().isNumeric(),

//validaciones roles
check('role', 'El rol es requerido').not().isEmpty(),
check('role').custom(ExisteRole)

, validarCampos]
,rutaPut);

router.delete('/deleteUser/:id', [validarJWT, tieneRol('ADMIN')] ,rutaDelete);


module.exports = router;