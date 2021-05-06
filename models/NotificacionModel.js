// Descripcion: Collecion para almacenar las notificaciones de los usuario
// Autor: Omar Arturo Moctezuma Padron

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const NotificacionSchema = new Schema({
	'fecha' :{type:Date, default: Date.now},
	'tipoNotificacion' : {type:String, enum: ['Pop-up','Alerta','Dentro de la seccion','Chat','Emergentes']},
	'contenidoNotificacion' : {type:String,minLength: [50,'Extencion minima de comentario de 50'], required:[true,'El contenido de la notificacion es requerido']},
	'cvUsuarioCrea' : {type: mongoose.Types.ObjectId,ref:'Usuario'},
	'cvUsuario': {type: mongoose.Types.ObjectId,ref:'Usuario'},
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);