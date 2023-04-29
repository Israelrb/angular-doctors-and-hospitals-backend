const { Schema, model} = require('mongoose');

// Definicion de los registros que va a tener la tabla hospitales
const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales'});

HospitalSchema.method('toJSON', function() {
   const { __v, ...object } = this.toObject();
   return object;
});

// Tenemos que tener cuidao con el primer parametro 'Hospital' porque moongose lo va a poner luego cuando se ejecute como 'Hospitals',
// lo hace en ingles pero si se quiere se puede conseguir que la tabla se llame "Hospitales"
module.exports = model('Hospital', HospitalSchema);