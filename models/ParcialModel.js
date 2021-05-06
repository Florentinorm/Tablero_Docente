var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ParcialSchema = new Schema({
	'numeroParcial' : Number,
	'fechaInicio': Date,
	'fechaFin': Date
});

module.exports = mongoose.model('Parcial', ParcialSchema);