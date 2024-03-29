// Ruta de los endpoints de médicos: '/api/medicos'

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico,
    getEspecialidades,
    getMedicoById
} =  require('../controllers/medicos');

const router = Router();


router.get( '/', validarJWT, getMedicos);
router.get( '/especialidades', getEspecialidades);
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('especialidad', 'La especialidad del médico es obligatoria').not().isEmpty(),
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

router.get( '/:id', validarJWT ,getMedicoById);



module.exports = router;