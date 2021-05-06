'use strict';

module.exports = {
    getEstudiantesData(req, res) {
        return res.render('home', { title: 'Express Estudiantes' });
    },
};