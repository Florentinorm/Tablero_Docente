'use strict';

const express = require('express');
const router = express.Router();
const usuarrio = require('../controllers/UsuarioController');
const { listar, invita, invitaEstudiante } = require('../controllers/DocenteController');
const {listarCurso, crearCurso, eliminarCurso, editarCurso, editarCursoTab} = require('../controllers/CursoController');
const { listarContenido, agregarTema, agregarActividad, editarTemaContenido, eliminarTema } = require('../controllers/ContenidoController');
const { listarContenidoEd, agregarTemaEd, agregarActividadEd, editarTemaContenidoEd, eliminarTemaEd } = require('../controllers/EditContenidoController');
const { listarPlaneacion, editarFechas, agregarFecha, agregarFechasE, editarFechasE, agregarFechasT, editarTema } = require('../controllers/PlanearController');
const RendimientoController = require('../controllers/RendimientoController'); // <---- rendimiento
const NotificacionController = require('../controllers/NotificacionController'); //<----notificacion
const EmailCtrl = require('../controllers/mailCtrl');
// const upload = require('../controllers/multer');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

/* GET users listing. */
router.get('/', listar);
//invitaciones
router.get('/invitaciones/:id', invita);
router.post('/correo/:id',EmailCtrl.sendEmail, invitaEstudiante);

router.get('/crearCurso', listarCurso);
//Crear Curso
router.post('/crearCurso/add', crearCurso);
//edita curso
router.post('/crearCurso/edit/:id',editarCurso);
//eliminar curso
router.get('/crearCurso/eliminar/:id', eliminarCurso);


// vista Tablero
router.get('/tableroDocente', listar);
//edita estado del curso - tableroDocente
router.post('/tableroDocente/edit/:id',editarCursoTab);

// contenido
router.get('/contenido/:id',listarContenido);
router.get('/contenido/',listarContenido);

//tema
router.post('/contenido/addT',agregarTema);
router.post('/contenido/editT/:id', editarTemaContenido);
router.get('/contenido/deleteT/:id', eliminarTema);
//actividad
router.post('/contenido/addA',upload.single('rutaRecurso'), agregarActividad);

//EditarContenido
// contenido
router.get('/editarC/:id',listarContenidoEd);
router.get('/editarC/',listarContenidoEd);
//tema
router.post('/editarC/addT',agregarTemaEd);
router.post('/editarC/editT/:id', editarTemaContenidoEd);
router.get('/editarC/deleteT/:id', eliminarTemaEd);
//actividad
router.post('/editarC/addA',upload.single('rutaRecurso'), agregarActividadEd);



//planeacion
router.get('/planear/:id',listarPlaneacion);
router.get('/editarActividad/:id',agregarFecha);
router.post('/editF/:id',editarFechas);
router.get('/editarExamen/:id',agregarFechasE);
router.post('/editE/:id',editarFechasE);
router.get('/editarTema/:id',agregarFechasT);
router.post('/editT/:id',editarTema);

//Rendimiento alumno
router.get('/rendimiento/:id', RendimientoController.mostrarRendimiento); //renderiza la vista de rendimiento
router.get('/mensaje/:id', RendimientoController.enviarNotificacion); //renderiza la vista de notificación 
router.post('/mensaje/add', NotificacionController.insertarNotificacion); //inserta notificacion

module.exports = router;