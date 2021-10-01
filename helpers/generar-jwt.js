const jwt = require('jsonwebtoken');


const generarJWT = (uid= '') =>{

    return new Promise (  (resolve, reject) => {

        //grabando en uid del usurio
        const playload = {uid}

        //firmar token
        jwt.sign(playload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '1d'
        },
        
        //Si ocurre un error
        (err, token) => {

            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else {
                resolve(token)
            }
        })


    })



}


module.exports = {
    generarJWT
}