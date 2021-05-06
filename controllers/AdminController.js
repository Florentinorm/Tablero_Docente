'use strict';

module.exports = {
    getAdminData(req, res) {
        return res.render('index', { title: 'Express Admin' });
    },
}; 