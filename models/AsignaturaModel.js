var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AsignaturaSchema = new Schema({
	'NombreAsignatura' : String,
	'Semestre' : Number,
	'Descripcion' : String,
	'Carrera' : String,
	'Estado' : Boolean,
	'Temario' : String,
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);