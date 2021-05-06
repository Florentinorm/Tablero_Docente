const CursoSchema = require('../models/CursoModel.js');
const PeriodoSchema = require('../models/PeriodoModel');
const ParcialSchema = require('../models/ParcialModel');
const TemaSchema = require('../models/TemaModel');
const ActividadSchema = require('../models/ActividalModel');
const ExamenSchema = require('../models/ExamenModel');
const titles = require('../config/titles');

EditContenidoController = {};

EditContenidoController.listarContenidoEd = async (req, res, next) => {
    const curso = await CursoSchema.findById(req.params.id).lean();
    const periodo = await PeriodoSchema.find().lean();
    const parcial = await ParcialSchema.find().lean();
    const tema = await TemaSchema.find({
        'cvCurso' : curso._id,
    }).lean();
    const examen = await ExamenSchema.find().lean();
    const actividad = await ActividadSchema.find().lean();
    res.render('docente/editarC', { curso,actividad, periodo, parcial, tema, examen, title: titles.view.agregaContenido});
}
//tema
EditContenidoController.agregarTemaEd  = async (req, res, next) => {
    const idCurso = req.body.idCurso;
    const tema = new TemaSchema(req.body);
    await tema.save();
    res.redirect('/docentes/editarC/'+idCurso);
}
EditContenidoController.editarTemaContenidoEd = async (req, res, next) => {
    const idCurso = req.body.idCurso;
    const { id } = req.params;
    await TemaSchema.update({_id: id}, req.body);
    res.redirect('/docentes/editarC/'+idCurso);
}
EditContenidoController.eliminarTemaEd = async (req, res, next) => {
    let { id } = req.params;
    await TemaSchema.remove({_id: id});
    res.redirect('/docentes/tableroDocente');
}

//Actividad
EditContenidoController.agregarActividadEd = async (req, res, next) => {
    const idCurso = req.body.idCurso;
    const actividad = new ActividadSchema(req.body);
    await actividad.save();
    res.redirect('/docentes/editarC/'+idCurso);
}

module.exports = EditContenidoController;