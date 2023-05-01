const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) =>{
    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre apellidos email google role img')
            .skip(desde)
            .limit( 5 ),
        
        Usuario.count()
    

    ])

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) =>{

    const { email, password } = req.body;

    

    try {
        const existeEmail = await Usuario.findOne({email: email});

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptado de la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Para guardar el usuario en la base de datos
        await usuario.save();


        // Generar el TOKEN -JWT
        const token = await generaJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      })  
    }
}

const actualizarUsuario = async (req, res = response) =>{
    // TODO: Validar token y comporobar si es el usuario correcto

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
              ok: false,
              msg: 'No existe un usuario por ese id'  
            })
        }


        //Actualización del usuario
        const {password, google, email,  ...campos } = req.body;
        if( usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Los usuarios de google no se pueden cambiar su correo'
            });
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: usuarioActualizado
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
              ok: false,
              msg: 'No existe un usuario por ese id'  
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        }) 
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
