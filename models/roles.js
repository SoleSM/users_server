const { model, Schema } = require('mongoose');

const UserSchema = new Schema({

    role : {type:String}
})

module.exports = model('Role', UserSchema);