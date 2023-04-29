const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
    
    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre apellidos img')

    
    res.json({
        ok: true,
        hospitales
    })
}

const creartHospital = async (req, res = response) => {
    // Asignación del uid del usuario que crea el hospital
    const uid = req.uid;
    const hospital = new Hospital({ 
        usuario: uid,
        ...req.body 
    });
    

    try {
        
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        })
    }

    
}

const actualizartHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizartHospital'
    })
}

const borrartHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrartHospital'
    })
}


module.exports = {
    getHospitales,
    creartHospital,
    actualizartHospital,
    borrartHospital
}