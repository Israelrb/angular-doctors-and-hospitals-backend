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

const actualizartHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        const camibosHospital = {
            ...req.body,
            usuario: uid,
        }
        
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, camibosHospital, {new: true});


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        })
    }
}

const borrartHospital = async (req, res = response) => {
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado por id'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        })
    }
}


module.exports = {
    getHospitales,
    creartHospital,
    actualizartHospital,
    borrartHospital
}