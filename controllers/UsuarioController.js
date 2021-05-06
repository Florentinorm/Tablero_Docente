'use strict';

const usuario = require('../models/UsuarioModel'); //Referencia modelo
const titles = require('../config/titles');

const usuarioController = {};

/*
 * Método controlador para listar todos los usuarios
 */
usuarioController.listar = function(req, res) {
    //Método consulta todos los usuarios de la colección usuarios MongoDB
    usuario.find({}).exec(function(error, usuarios) {
        if (error) {
            console.log("Error: ", error);
            return;
        }
        console.log("Listado de Usuarios");
        res.render('../views/usuario/list', { usuarios: usuarios });
    });
};

usuarioController.show = function(req, res) {
    Usuario.findOne({ email: req.params.email }).exec(function(error, usuario) {
        if (error) {
            console.log("Error: ", error);
            return;
        }
        console.log("Muestra estudiante con email: ", email);
        res.render('../views/usuario/show', { usuario: usuario });
    });
};

usuarioController.create = function(req, res) {
    res.render('../views/usuario/create');
};

usuarioController.home = function(req, res) {
    res.render('home', { title: titles.view.home });
};

usuarioController.login = function(req, res) {

    usuario.findOne({ email: req.body.email }).exec(function(error, user) {
        if (error) {
            console.log("Error: ", error);
            req.flash('mensaje', 'Lo sentimos hubo un error');
            return;
        } else {
            if (user == null) {
                console.log('Usuario incorrecto');
                res.render('home', { mensaje: 'Email o contraseña inválida' });
            } else {
                console.log(user);
                res.render('../views/estudiante/home', { titulo: 'Bienvenido' });

            }
        }
    });
};

usuarioController.save = function(req, res) {
    const usuario = new Usuario(req.body);

    Usuario.save(function(error) {
        if (error) {
            console.log("Error: ", error)
            return;
        }
        console.log("Registrado guardado exitosamente");
        res.redirect('/');
    });
};

module.exports = usuarioController;