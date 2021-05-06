const NotificacionSchema = require('../models/NotificacionModel');
const UsuarioSchema = require('../models/UsuarioModel');
const titles = require('../config/titles');


NotificacionController = {};

NotificacionController.insertarNotificacion = function (req, res) {

    var Notificacion = new NotificacionSchema({
        tipoNotificacion : req.body.tipoNotificacion,
        contenidoNotificacion : req.body.contenidoNotificacion,
        cvUsuario : req.body.cvUsuario,

    });
    Notificacion.save(function (err, Notificacion) {
        if (err) {
            return res.status(500).json({
                message: 'Error al crear Notificacion',
                error: err
            });
        }
      //  return res.redirect('/docentes/');
      return res.status(201).json(Notificacion);
    });
}

module.exports = NotificacionController;