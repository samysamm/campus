'use strict';

var express = require('express');
var controller = require('./reservation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('reservation.show'), controller.index);
router.get('/:id', auth.hasRole('reservation.show'), controller.show);
router.post('/', auth.hasRole('reservation.create'), controller.create);
router.put('/:id', auth.hasRole('reservation.update'), controller.update);
router.patch('/:id', auth.hasRole('reservation.update'), controller.update);
router.delete('/:id', auth.hasRole('reservation.delete'), controller.destroy);

module.exports = router;