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
   
    //apuntamos a la id del usuario
    const {id} = req.params;
   
    //Vienen todos los datos menos el id y password
    const {_id,password,...resto} = req.body
  
    
    try {

        //Encriptacion de password
        if(password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt) //guarda la nueva password encriptada en resto
        } 
     
        const user = await User.findByIdAndUpdate(id, resto, { new: true })
      
        res.json({

            msg: 'Usuario actualizado correctamente',
            user
        })

    } catch (error) {
        
        console.log('error:',error)
    }
    

    
}



//Ruta para eliminar usuarios
ctrlUsers.rutaDelete = async (req, res) => {
    const {id} = req.params;
    
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