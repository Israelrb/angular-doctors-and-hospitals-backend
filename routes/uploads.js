// Ruta: '/api/upload/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload());

// El :tipo puede ser o usuario, medico o hospital, :id es el id del documento
router.put('/:tipo/:id', validarJWT , fileUpload);

router.get('/:tipo/:foto', retornaImagen);




module.exports = router;