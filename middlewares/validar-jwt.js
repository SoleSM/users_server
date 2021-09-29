const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/users');


const validarJWT = async (req = request, res = response, next) => {
    
    //valida si se envia el token

    const token = req.header('x-token');

    if(!token){

        res.status(401).json({
            msg: "No hay token"
        })
    }


    try {

        //Verificar si el token es valido

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Lee el usuario del id del token
        const usuario = await user.findById(uid);

        //verificar existencia de usuario en la base de datos
        if(!usuario){
            return res.status(401).json({
                msg: "Token no valido, no existe el usuario"
            })
        }


        //Verificar estado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token inválido, usuario inactivo'
            })
        }

        //Guardar los datos del usuario

        req.usuario = usuario;

        next()
        
    } catch (error) {
        
        res.json({
            msg:"Token no valido"
        })
    }
    

    next();

}

module.exports = {

    validarJWT
}
