'use strict';

angular
    .module('finances')
    .factory('User', ['$resource', 'consts', function ($resource, consts) {
        return $resource(consts.apiUrl + '/usuario/:controller/:id', 
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
