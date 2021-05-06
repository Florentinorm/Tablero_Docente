const TemaSchema = require('../models/TemaModel');
const CursoSchema = require('../models/CursoModel');
const ParcialSchema = require('../models/ParcialModel');
const ActividadSchema = require('../models/ActividalModel');
const ExamenSchema = require('../models/ExamenModel');
const titles = require('../config/titles');

PlanearController = {};

PlanearController.listarPlaneacion = async (req, res, next) => {
    const curso = await CursoSchema.findById(req.params.id).lean();
    const parcial = await ParcialSchema.find().lean();
    const tema = await TemaSchema.find({
        'cvCurso' : curso._id,
    }).lean();
    const actividad = await ActividadSchema.find().lean();
    const examen = await ExamenSchema.find().lean();

    res.render('docente/planearCurso', { curso, parcial, tema, actividad, examen, title: titles.view.planearCurso});
}
PlanearController.agregarFecha = async (req, res, next) => {
    const actividad = await ActividadSchema.findById(req.params.id).lean();
    res.render('docente/editar/fechas',{actividad , title: titles.view.planeaActividad});
}
PlanearController.editarFechas = async (req, res, next) => {
    const { id } = req.params;
    await ActividadSchema.update({_id: id}, req.body);
    res.redirect('/docentes/planear');
}

PlanearController.agregarFechasE = async (req, res, next) => {
    const examen = await ExamenSchema.findById(req.params.id).lean();
    res.render('docente/editar/fechasE',{examen, title: titles.view.planeaExamen});
}
PlanearController.editarFechasE = async (req, res, next) => {
    const { id } = req.params;
    await ExamenSchema.update({_id: id}, req.body);
    res.redirect('/docentes/planear');
}
PlanearController.agregarFechasT = async (req, res, next) => {
    const tema = await TemaSchema.findById(req.params.id).lean();
    res.render('docente/editar/fechasT',{tema, title: titles.view.planeaTema });
}

PlanearController.editarTema = async (req, res, next) => {
    const { id } = req.params;
    await TemaSchema.update({_id: id}, req.body);
    res.redirect('/docentes/planear');
}

module.exports = PlanearController;
