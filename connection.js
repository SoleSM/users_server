const mongoose = require("mongoose");
require('dotenv').config();
// mongoose
//   .connect('mongodb+srv://ppf_server:Jk123@cluster0.j3nop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
//   .then(() => console.log("Conectado a la base de datos"))
//   .catch((err) => console.error('ERROR AL CONECTAR DB: ', err));

mongoose.connect(process.env.ATLAS

  )
.then(() => console.log("Conectado a la base de datos"))
.catch((err) => console.error('ERROR AL CONECTAR DB: ', err));


