const ctrlUsers = {};
const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const chalk = require('chalk')



//Ruta para obtener todos los usuarios
ctrlUsers.rutaGet = async(req, res) => {

    const user = await User.find();

    res.json(user);

};



//Ruta para agregar usuarios
ctrlUsers.rutaPost = async(req, res) =>{

    const {username, password, role }  = req.body;
    const user = new User({username, password, role});

    //Verificar si username existe

   
    //Encriptar contraseña

    const salt = bcryptjs.genSaltSync(); //cantidad de vueltas que va a dar para hacer mas complicado el met de encriptacion, por defecto:10
    user.password = bcryptjs.hashSync( password, salt) //el metodo requiere lo que vamos a encriptar y la cantidad de vueltas que va a dar

    //Guardar usuario en base de datos
    try {
       
        await user.save();
        res.json({
            msg: 'Usuario agregado exitosamente', user
        })

    } catch (error) {
        //Si opcurre un error

       console.log(error)
       res.json({
           msg: 'Usuario no agregado'
       })
    }

}


//Ruta para modificar usuarios
ctrlUsers.rutaPut = async (req, res) => {
    console.log(chalk.blue(req.body.password))
    console.log(chalk.green(req.params.id))
    const {id} = req.params;
    console.log(id)
    //const {password,telefono, username, , role} = req.body;
    const {password,telefono, username, role} = req.body
    //console.log(chalk.yellow(resto))
    console.log(password, telefono, username, role)
    try {
       /*  if(password ){
            const salt = bcryptjs.genSaltSync(10);
            password = bcryptjs.hashSync(password, salt)
        } */
        console.log(password)
        const user = await User.findByIdAndUpdate(id, {username, password, telefono, role}, { new: true })
        console.log('ACACACAS',user)
        res.json({

            msg: 'Usuario actualizado correctamente',
            user
        })

    } catch (error) {
        res.status(401).json({
            msg: "Ocurrio un error al intentar actualizar los datos del usuario"
        })
    }
    

    //PROBLEMA: guarda los datos en la BD pero no realiza las validaciones que estan antes de la rutaPut (username, password,
    // campos vacios ni existencia de roles)
    
}



//Ruta para eliminar usuarios
ctrlUsers.rutaDelete = async (req, res) => {
    const  id = req.params.id;
    
    try {
       
        await User.findByIdAndDelete(id)

        res.json({
            msg: 'Usuario eliminado correctamente'
        })

    } catch (error) {
        console.log('Error al eliminar Usuario: ', error)
    }
}


module.exports = ctrlUsers;