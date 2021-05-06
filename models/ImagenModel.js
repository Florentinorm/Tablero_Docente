var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ImagenSchema = new Schema({
	'nombre' : String,
	'ruta' : String,
});

module.exports = mongoose.model('Imagene', ImagenSchema);