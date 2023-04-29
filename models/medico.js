const { Schema, model} = require('mongoose');

// Definicion de los registros que va a tener la tabla hospitales
const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }

});

MedicoSchema.method('toJSON', function() {
   const { __v, ...object } = this.toObject();
   return object;
});

// Tenemos que tener cuidao con el primer parametro 'Medico' porque moongose lo va a poner luego cuando se ejecute como 'Medicos'
module.exports = model('Medico', MedicoSchema);