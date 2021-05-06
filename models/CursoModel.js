const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CursoSchema = new Schema({
	'nombre' : {type:String,minLength:3,index: true, required:[true,'El nombre del Curso es requerido']},
	'descripcion': {type:String, minLength:5, required:[true,'La descripcion del Curso es requerida']},
	'estado': {type:String, enum: ['pendiente', 'activo', 'inactivo']},
	'esPlaneado':  {type: Boolean, default: false},
	'duracion': { type:String },
	'avance': { type:String },
	'cvAsignatura': {type: mongoose.Types.ObjectId},
	'cvGrupo': {type: mongoose.Types.ObjectId},
	'cvPeriodo': {type: mongoose.Types.ObjectId},
	'cvImagen': {type: mongoose.Types.ObjectId},
	'estudiantes': [{
		'cvUsuario': { type: mongoose.Types.ObjectId },
		'avance': { type: Number, default: 0 },
		'ultimaFechaIngreso': { type: Date, default: Date.now },
		'esInvitado': { type: Boolean, default: false },
		'correo': {
			type: String, 
			match: /.+\@.+\..+/,
			index: true
		}
	}],
	'cvUsCreaCurso':{type:mongoose.Types.ObjectId}
});

module.exports = mongoose.model('Curso', CursoSchema);
