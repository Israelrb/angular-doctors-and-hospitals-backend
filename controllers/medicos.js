const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async (req, res = response) => {
    
    const medicos = await Medico.find()
                                .populate('usuario', 'nombre apellidos img')
                                .populate('hospital', 'nombre img')
    res.json({
        ok: true,
        medicos
    })
}

const creartMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {
        
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        });
    }
}

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            });
        }

        const camibosMedico = {
            ...req.body,
            usuario: uid,
        }
        
        const medicoActualizado = await Medico.findByIdAndUpdate(id, camibosMedico, {new: true});


        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico Borrado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del backend'
        })
    }
}


const getEspecialidades = async (req, res = response) => {
    try {
        const usuarios = await prisma.usuario.findMany({
          select: {
            nombre: true, // Selecciona el campo "nombre"
          },
        });
        return usuarios;
      } catch (error) {
        throw new Error('Error al obtener los nombres de usuarios: ' + error.message);
      } finally {
        await prisma.$disconnect();
      }

    
    
    // try {
    //     const counts = await YourModel.aggregate([
    //         { $group: { _id: "especialidades", count: { $sum: 1 } } }
    //       ]);
    //       res.send(counts);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el administrador del backend'
    //     })
    // }

    // try {
    //     const counts = await YourModel.aggregate([
    //         { $group: { _id: "$tipo", count: { $sum: 1 } } }
    //       ]);
    //       res.send(counts);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el administrador del backend'
    //     })
    // }
}

const getMedicoById = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
                                .populate('usuario', 'nombre apellidos img')
                                .populate('hospital', 'nombre img');
        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
}


module.exports = {
    getMedicos,
    creartMedico,
    actualizarMedico,
    borrarMedico,
    getEspecialidades,
    getMedicoById
}