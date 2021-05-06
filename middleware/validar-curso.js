const {check} = require('express-validator');
const mensajes = require('../config/titles.js');

exports.form = [
    check('nombre').notEmpty().withMessage(mensajes.error.nombreVacio)
];