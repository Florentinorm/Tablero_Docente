const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PeriodoSchema = new Schema({
	'nombrePeriodo' : String,
	'fechaInicio' : Date,
	'fechaFin' : Date,
	'estado' : Boolean,
});

module.exports = mongoose.model('Periodo', PeriodoSchema);