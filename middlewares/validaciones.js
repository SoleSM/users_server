
const Role = require('../models/roles');
const Username  = require('../models/users');

//--------------------------------------------tp5-----------------------

const ExisteRole = async(role = '')=> {
    const RoleEncontrado = await Role.findOne({role});

    if(!RoleEncontrado){
        throw new Error('El Rol no existe')
    }
}

const ExisteUsername = async( username = '') => {
    const UsernameEncontrado = await  Username.findOne({username});

    if(UsernameEncontrado){
        throw new Error('El usuario ya existe')
    }
}

module.exports = {
     ExisteRole, ExisteUsername

}