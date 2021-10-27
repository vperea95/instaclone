const mongoose = require("mongoose");
// require("dotenv").config({ path: ".env" });


// console.log( process.env.BBDD)

// mongoose.connect(
//     process.env.BBDD,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: false,
//     }, 
//     (err, _) => {
           
//         if (err) {
//             console.log("Error al conectar",err);
//         } else {
//             console.log("Conexion Correcta");
//         }
//     }
// );

// mongodb+srv://root:SbN3bp579x4rj2jg@aplication.alczl.mongodb.net/aplication

require("dotenv").config({ path: ".env" });

const connect = async () => {
  await mongoose
    // .connect(process.env.BBDD, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .connect('http://localhost:27017/dashboard', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log(`Mongo running at ${process.env.BBDD}`))
    .catch(err => console.log(err))
}

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    await connect()
  }
  return handler(req, res)
}

const db = mongoose.connection
db.once('ready', () => console.log(`connected to mongo on ${process.env.BBDD}`))

module.exports = { connectDB }
