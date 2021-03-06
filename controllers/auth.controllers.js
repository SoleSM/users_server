const {request, response} = require('express');
const Usuario = require('../models/users');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const users = require('../models/users');



const login = async(req = request, res= response) => {

    const{ username, password} = req.body;

    
    try {

        //Verificar existencia de usuario
        const user = await Usuario.findOne({username});
        if(!user){
            return res.json({
                msg:'El usuario o la contraseña no son correctos'
            })

        } 

        //verificar contraseña
        const validarPass = bcryptjs.compareSync(password, user.password); //la funcion compara la password de la req con la de la bd

        if(!validarPass){

            return res.json({
                msg:'Contraseña incorrecta'
            })
        }

        //Generacion del JWT
        console.log(user.id, 'idtoken')
        const token = await generarJWT(user.id);

        res.json({
            user,
            token, 
            msg: 'login ok'
        })

    } catch (error) {
        console.log(error)

        return res.json({
            msg: 'Error al iniciar sesion'
        })
    }


}


module.exports = {
    login
}