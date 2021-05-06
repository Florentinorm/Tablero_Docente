const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ActividadSchema = new Schema({
	'nombre' : {type:String, maxLength: 100, index: true, required:[true,'El nombre de la actividad es requerido']},
	'descripcion' : {type:String, maxLength: 200, required:[true,'La descripcion de la actividad es requerida']},
	'rutaRecurso' : {type:String},
	'numeroPreguntas' : {type:Number, min: 1, max: 5},
	'numero' : {type:Number, min: 1, max: 10},
	'fechaFin' :  {type:Date, default: Date.now},
	'fechaInicio' :  {type:Date, default: Date.now},
	'tipo' : {type:String, enum: ['Infografia', 'Video', 'Practica', 'Tarjeta','Examen']},
	'ponderacion' : {type:Number, required:[true,'La ponderacion de la actividad es requerida']},
	'cvTema': {type: mongoose.Types.ObjectId},
	'cvParcial':{type: mongoose.Types.ObjectId},
});

module.exports = mongoose.model('Actividad', ActividadSchema);