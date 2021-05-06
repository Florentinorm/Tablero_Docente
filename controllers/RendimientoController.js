const CursoSchema = require('../models/CursoModel.js');
const TemaSchema = require('../models/TemaModel.js');
const ParcialSchema = require('../models/ParcialModel.js');
const UsuarioSchema = require('../models/UsuarioModel');
const titles = require('../config/titles');


RendimientoController = {};

RendimientoController.mostrarRendimiento = async (req, res) => {
    //Recupera el ID del curso
     // const parcial = await ParcialSchema.findOne(req.params.numeroParcial)
     const idCurso = await CursoSchema.findById(req.params.id).lean();
     //Recupera los datos del curso con el ID seleccionado
     const  Curso = await CursoSchema.findOne({
       '_id' : idCurso
     }
     ).lean();
     //Buscamos al usuario con el id de grupo que pertenece a un curso
     const Usuario = await UsuarioSchema.find({
       'cvGrupo' : Curso.cvGrupo
     }).lean();
     //Buscamos el avance del usuario
     const EntregaActividad = await CursoSchema.find()
   //Buscamos el Tema con el id del curso
   const Tema = await TemaSchema.find({ //Recupera los datos del Tema
     'cvCurso' : idCurso
     //'cvParcial' : Parcial._id
   }).lean();




  const Passport = JSON.stringify(Estudiantes); // remove await this is not async process
  const PassportValue = JSON.parse(Passport);
  console.log(Passport);

   //res.json(PassportValue);
  // console.log(Passport);
     res.render('docente/rendimiento', { curso: PassportValue, Tema, Parcial, Usuario, title: titles.view.rendimiento});

}

RendimientoController.enviarNotificacion = async (req, res) => {
  const Usuario = await UsuarioSchema.findById(req.params.id).lean(); 
  const Curso = await CursoSchema.findById(req.params.id).lean();
  res.render('docente/enviarNotificacion', {Usuario, Curso});

}




module.exports = RendimientoController;