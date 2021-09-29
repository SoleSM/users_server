const router = require('express').Router();
const { rutaGet, rutaPost, rutaPut, rutaDelete }= require('../controllers/users.controllers');
const {body} = require('express-validator');
const {validarCampos}= require('../helpers/validacionCampos');
const {ExisteRole, ExisteUsername} = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/getUser', rutaGet);

router.post('/postUser', 
//validaciones username
[body('username', 'el username es requerido').not().isEmpty(),
body('username', 'el username debe tener un minimo de 7 caracteres ').isLength({min: 7}),
body('username').custom(ExisteUsername),

//validaciones password
body('password', 'La contraseña es requerida').not().isEmpty(),
body('password', 'La contraseña debe tener un minimo de 8 caracteres').isLength({min: 8}),

//validacion telefono
body('telefono', 'El telefono no es valido').not().isEmpty().isNumeric(),

//validaciones roles
body('role', 'El rol es requerido').not().isEmpty(),
body('role').custom(ExisteRole)
, validarCampos]
,rutaPost);





router.put('/editUser/:id', 
//validaciones username
[validarJWT,
body('username', 'el username es requerido').not().isEmpty(),
body('username', 'el username debe tener un minimo de 7 caracteres ').isLength({min: 7}),

//validaciones password
body('password', 'La contraseña es requerida ').not().isEmpty(),
body('password', 'La contraseña debe tener un minimo de 8 caracteres').isLength({min: 8}),

//validacion telefono
body('telefono', 'El telefono no es valido').not().isEmpty().isNumeric(),

//validaciones roles
body('role', 'El rol es requerido').not().isEmpty(),
body('role').custom(ExisteRole)

, validarCampos]
,rutaPut);

router.delete('/deleteUser/:id', rutaDelete);


module.exports = router;