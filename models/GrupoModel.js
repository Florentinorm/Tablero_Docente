var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GrupoSchema = new Schema({
	'NombreGrupo' : String,
	'Carrera' : String,
	'Semestre' : Number,
});

module.exports = mongoose.model('Grupo', GrupoSchema);
