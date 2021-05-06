const CursoSchema = require('../models/CursoModel.js');
const AsignaturaSchema = require('../models/AsignaturaModel');
const GrupoSchema = require('../models/GrupoModel');
const ImagenSchema = require('../models/ImagenModel');
const titles = require('../config/titles');
const mensajes = require('../middleware/validar-curso');
const PeriodoSchema = require('../models/PeriodoModel');

CursoController = {};

//Tablero Docente
CursoController.listar = async (req, res) => {
    const asignatura = await AsignaturaSchema.find().lean();
    const curso = await CursoSchema.find().lean();
    const grupo = await GrupoSchema.find().lean();
    const imagen = await ImagenSchema.find().lean();
    const periodo = await PeriodoSchema.find().lean();
    res.render('docente/tablero', { asignatura, curso, grupo, imagen, periodo, title: titles.view.crearCurso });
}
//Edita el estado del curso - tableroDocente
CursoController.editarCursoTab = async (req, res, next) => {
    const { id } = req.params;
    await CursoSchema.update({_id: id}, req.body);
    res.redirect('/docentes/tableroDocente');
}

CursoController.listarCurso = async (req, res) => {
    const asignatura = await AsignaturaSchema.find().lean();
    const curso = await CursoSchema.find().lean();
    const grupo = await GrupoSchema.find().lean();
    const imagen = await ImagenSchema.find().lean();
    res.render('docente/crearCurso', { asignatura, curso, grupo, imagen, title: titles.view.crearCurso });
}
// CursoController.listarCurso = function(req, res){
//     CursoSchema.find({}).lean().exec(function(err, curso){
//         if( err ){ console.log('Error: ', err); return; }
//         console.log(curso);
//         res.render('docente/crearCurso', {curso: curso} );
//     });
// }
CursoController.crearCurso = function (req, res) {
    const Curso = new CursoSchema({
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        estado : 'pendiente',
        esPlaneado : false,
        duracion : null,
        avance : null,
        cvAsignatura : req.body.cvAsignatura,
        cvGrupo : req.body.cvGrupo,
        cvPeriodo : null,
        cvImagen : req.body.cvImagen,
        estudiantes : [{
            cvUsuario: null,
            avance : null,
            ultimaFechaIngreso : null,
            esInvitado : null,
            correo : 'nose@gmail.com'
        }],
        cvUsCreaCurso : null
    });
    Curso.save(function (err, Curso) {
        if (err) {
            return res.status(500).json({
                message: 'Error al crear curso',
                error: err
            });
        }
        return res.redirect('/docentes/crearCurso');
        // return res.status(201).json(Curso);
    });
}
// CursoController.crearCurso = async (req, res, next) => {
//     const curso = new CursoSchema(req.body);
//     await curso.save();
//     res.redirect('/docentes/crearCurso');
// }

CursoController.editarCurso = async (req, res, next) => {
    const { id } = req.params;
    await CursoSchema.update({_id: id}, req.body);
    res.redirect('/docentes/crearCurso');
}

CursoController.eliminarCurso = async (req, res, next) => {
    let { id } = req.params;
    await CursoSchema.remove({_id: id});
    res.redirect('/docentes/crearCurso');
}

module.exports = CursoController;