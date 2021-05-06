const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ExamenSchema = new Schema({
	'nombre' : {type:String,minLength:3, maxLength: 100, index: true, required:[true,'El nombre del Examen es requerido']},
	'fechaInicio' : {type:Date, default: Date.now},
	'fechaFin' : {type:Date, default: Date.now},
	'numeroReactivos' : Number,
	'intentos' : {type:Number,min: 0, max: 10, required:[true,'La cantidad de intentos es requerida']},
	'duracion' : String,
	'cvTema': {type: mongoose.Types.ObjectId,unique:true}
});

module.exports = mongoose.model('Examen', ExamenSchema);