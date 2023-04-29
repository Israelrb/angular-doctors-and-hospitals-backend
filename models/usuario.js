const { Schema, model} = require('mongoose');

// Definicion de los registros que va a tener la tabla usuarios
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.method('toJSON', function() {
   const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
   return object;
});

// Tenemos que tener cuidao con el primer parametro 'Usuario' porque moongose lo va a poner luego cuando se ejecute como 'Usuarios'
module.exports = model('Usuario', UsuarioSchema);