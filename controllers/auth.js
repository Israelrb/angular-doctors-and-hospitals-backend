const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email }); 

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }


        // Genera el token -JWT
        const token = await generaJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        });
    }
}


const googleSingIn = async(req, res = response) => {

    try {
        const {email, name, picture} = await googleVerify( req.body.token ); 

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if(!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                apellidos: ' ',
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@';
        }

        // Guardar Usuario
        await usuario.save();

        // Genera el token -JWT
        const token = await generaJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        });
    }
    
}

module.exports = {
    login,
    googleSingIn
}