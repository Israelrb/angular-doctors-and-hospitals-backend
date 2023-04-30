// Ruta de los endpoints de médicos: '/api/medicos'

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico
} =  require('../controllers/medicos');

const router = Router();


router.get( '/', getMedicos);
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    creartMedico);


router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El id hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico);


router.delete( '/:id', validarJWT ,borrarMedico);



module.exports = router;