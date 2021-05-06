const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TemaSchema = new Schema({
	'nombre' : {type:String, maxLength: 100, index: true, required:[true,'El nombre del tema es requerido']},
	'descripcion' : {type:String, maxLength: 200, required:[true,'La descripcion del tema es requerida']},
	'fechaInicio' : {type:Date, default: Date.now},
	'fechaFin' : {type:Date, default: Date.now},
	'cvCurso':{type: mongoose.Types.ObjectId},
	'cvParcial': {type: mongoose.Types.ObjectId}
});

module.exports = mongoose.model('Tema', TemaSchema);