const {model, Schema} = require('mongoose');

const UserSchema = new Schema({

    username: {type:String, required: true},
    password: {type:String, required:true},
    telefono:{type:Number},
    role: {type:String, required: true},
    estado: { type: Boolean, default: true}
})



UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...restoUsuario} = this.toObject();
    restoUsuario.uid = _id;
    return restoUsuario;
} 


module.exports = model('users', UserSchema)