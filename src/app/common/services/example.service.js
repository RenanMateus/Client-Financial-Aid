'use strict';

angular
    .module('finances')
    .factory('AircraftConfiguration', ['$resource', 'consts', function ($resource, consts) {
        return $resource(consts.apiUrl + '/aircraft_config/:controller/:id', 
        {
            id: '@_id',
            controller: '@controller'
        }, {
            findById: {
                method: 'GET',
                params:{
                    controller: 'get-id'
                }
            },
            findAll: {
                method: 'GET',
                params: {
                    controller: 'get-all'
                }
            },
            insert: {
                method: 'POST',
                params: {
                    controller: 'insert'
                }
            },
            update: {
                method: 'PUT',
                params: {
                    controller: 'update'
                }
            },
            search: {
                method: 'GET',
                params: {
                    controller: 'search'
                }
            }
        });
    }]);
