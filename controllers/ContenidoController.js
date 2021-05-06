const CursoSchema = require('../models/CursoModel.js');
const PeriodoSchema = require('../models/PeriodoModel');
const ParcialSchema = require('../models/ParcialModel');
const TemaSchema = require('../models/TemaModel');
const ActividadSchema = require('../models/ActividalModel');
const ExamenSchema = require('../models/ExamenModel');
const titles = require('../config/titles');

ContenidoController = {};

ContenidoController.listarContenido = async (req, res, next) => {
    const curso = await CursoSchema.findById(req.params.id).lean();
    const periodo = await PeriodoSchema.find().lean();
    const parcial = await ParcialSchema.find().lean();
    const tema = await TemaSchema.find({
        'cvCurso' : curso._id,
    }).lean();
    const examen = await ExamenSchema.find().lean();
    const actividad = await ActividadSchema.find().lean();
    res.render('docente/contenido', { curso,actividad, periodo, parcial, tema, examen, title: titles.view.agregaContenido});
}
//tema
ContenidoController.agregarTema  = async (req, res, next) => {
    const idCurso = req.body.idCurso;
    const tema = new TemaSchema(req.body);
    await tema.save();
    res.redirect('/docentes/contenido/'+idCurso);
}
ContenidoController.editarTemaContenido = async (req, res, next) => {
    const idCurso = req.body.idCurso;
    const { id } = req.params;
    await TemaSchema.update({_id: id}, req.body);
    res.redirect('/docentes/contenido/'+idCurso);
}
ContenidoController.eliminarTema = async (req, res, next) => {
    let { id } = req.params;
    await TemaSchema.remove({_id: id});
    res.redirect('/docentes/crearCurso');
}

//Actividad
ContenidoController.agregarActividad = async (req, res, next) => {
    const idCurso = req.body.idCurso;
    const actividad = new ActividadSchema(req.body);
    await actividad.save();
    res.redirect('/docentes/contenido/'+idCurso);
}
// ContenidoController.agregarActividad = function (req, res) {
//     const actividad = new ActividadSchema({
//         nombre : req.body.nombre,
//         descripcion: req.body.descripcion,
//         rutaRecurso: req.file.rutaRecurso,
//         ponderacion: req.body.ponderacion,
//         cvTema: req.body.cvTema,
//         cvCurso: req.body.cvCurso
//     });
//     actividad.save(function (err, actividad) {
//         if (err) {
//             return res.status(500).json({
//                 message: 'Error al crear curso',
//                 error: err
//             });
//         }
//         return res.redirect('/docentes/crearCurso');
//         // return res.status(201).json(Curso);
//     });
// }

module.exports = ContenidoController;