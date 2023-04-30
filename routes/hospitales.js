// Ruta de los hospitales: '/api/hospitales'

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    creartHospital,
    actualizartHospital,
    borrartHospital
} =  require('../controllers/hospitales');

const router = Router();


router.get( '/', getHospitales);
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    creartHospital);


router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizartHospital);


router.delete( '/:id', validarJWT , borrartHospital);



module.exports = router;