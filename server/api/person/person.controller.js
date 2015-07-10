'use strict';

var _ = require('lodash');
var Person = require('./person.model');
var mongoose = require('mongoose');

// Get list of persons
exports.index = function(req, res) {
  var keyword = {$regex: new RegExp(req.query.keyword,'i')};
  var where = {$or: [{lastName: keyword}, {firstName: keyword}, {code: keyword}, {city: keyword}]};
  var orderBy = req.query.orderBy;
  Person.find(where)
    .skip(req.query.perPage * (req.query.page - 1))
    .limit(req.query.perPage)
    .sort({orderBy: req.query.orderDir})
    .exec(function(err, persons) {
        Person.count().exec(function(err, count) {
          res.setHeader('pages', Math.ceil( count / req.query.perPage ));
          res.setHeader('count', count);
          res.json(200, persons);
        })
    });
};

// Get a single person
exports.show = function(req, res) {
  Person.findById(req.params.id, function (err, person) {
    if(err) { return handleError(res, err); }
    if(!person) { return res.send(404); }
    return res.json(person);
  });
};

// Creates a new person in the DB.
exports.create = function(req, res) {
  Person.create(req.body, function(err, person) {
    if(err) { return handleError(res, err); }
    return res.json(201, person);
  });
};

// Updates an existing person in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Person.findById(req.params.id, function (err, person) {
    if (err) { return handleError(res, err); }
    if(!person) { return res.send(404); }
    var updated = _.merge(person, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, person);
    });
  });
};

// Deletes a person from the DB.
exports.destroy = function(req, res) {
  Person.findById(req.params.id, function (err, person) {
    if(err) { return handleError(res, err); }
    if(!person) { return res.send(404); }
    person.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

//delete multiple products from the DB
exports.deletemultiple = function(req, res) {
  var ids = req.body.ids.map(function(id){
    return mongoose.Types.ObjectId(id);
  });
  console.log(ids);
  Person.remove({ _id: { $in: ids } }, function (err) {
    if(err) { return handleError(res, err); }
    res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}