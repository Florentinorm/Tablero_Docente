'use strict';

const express = require('express');
const router = express.Router();

const usuario = require('../controllers/UsuarioController.js');

/* Listado de rutas de rol estudiante*/
router.get('/', usuario.home);
router.post('/login', usuario.login);

module.exports = router;