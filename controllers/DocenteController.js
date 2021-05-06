const CursoSchema = require('../models/CursoModel.js');
const AsignaturaSchema = require('../models/AsignaturaModel');
const GrupoSchema = require('../models/GrupoModel');
const ImagenSchema = require('../models/ImagenModel');
const titles = require('../config/titles');

 DocenteController = {}

 DocenteController.listar = async (req, res) => {
    const asignatura = await AsignaturaSchema.find().lean();
    const curso = await CursoSchema.find().lean();
    const grupo = await GrupoSchema.find().lean();
    const imagen = await ImagenSchema.find().lean();
    res.render('docente/tablero', { asignatura, curso, grupo, imagen, title: titles.view.tableroDocente });
}

//invitaciones
DocenteController.invita = async (req, res) => {
    const curso = await CursoSchema.findById(req.params.id).lean();
    res.render('docente/invitaciones', {curso, title: titles.view.invitaciones });
}
DocenteController.invitaEstudiante = async (req, res, next) => {
        const curso = new CursoSchema(req.body);
        await curso.save();
        res.redirect('/docentes/crearCurso');
    }


 module.exports = DocenteController;