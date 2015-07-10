'use strict';

angular.module('campusApp')
    .factory('Fields', function($filter) {
        var data = {
                user: {
                    firstName: {label: 'firstName', visible: true},
                    lastName: {label: 'lastName', visible: true},
                    username: {label: 'username', visible: true},
                    email: {label: 'email', visible: true},
                    roles: {label: 'roles', visible: false, callback: function (roles) {return roles.join(', ')}},
                    activated: {label: 'activated', visible: true, callback: function (activated) {return activated ? 'enabled' : 'disabled'}},
                    langKey: {label: 'langKey', visible: true}
                },
                person: {
                    code: {label: 'code', visible: true, sortable: true},
                    lastName: {label: 'lastName', visible: true, sortable: true},
                    firstName: {label: 'firstName', visible: true},
                    gender: {label: 'gender', visible: true, callback: $filter('genderConversion')},
                    birthDay: {label: 'birthDay', visible: true, callback: $filter('toDate')},
                    city: {label: 'city', visible: false},
                    country: {label: 'country', visible: false},
                    address: {label: 'address', visible: false},
                    description: {label: 'description', visible: false},
                    tel: {label: 'tel', visible: false},
                    type: {label: 'type', visible: false},
                    status: {label: 'status', visible: false},
                    isArchived: {label: 'archived', visible: false},
                    isBanned: {label: 'banned', visible: false},
                    updated: {label: 'updated', visible: false}
                },
                room: {
                    name: {label: 'name', visible: false},
                    floor: {label: 'floor', visible: false},
                    capacity: {label: 'capacity', visible: false},
                    free: {label: 'free', visible: false},
                    block: {label: 'block', visible: false},
                    reservations: {label: 'reservations', visible: false}
                },
                product: {
                    type: {label: 'type', visible: true},
                    category: {label: 'category', visible: true,callback: function(a){return a.name;}},
                    
                },
                category:{


                }
        };
        return {
            get: function(type) {
                return data[type];
            },
            getValue: function(entity, field){
                if(field.callback ){
                    return field.callback(entity[field.label]);
                }
                return entity[field.label];
            }
        };
    });