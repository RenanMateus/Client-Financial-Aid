(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CategoriesModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', CategoriesModalController]);


    function CategoriesModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth) {
        const vm = this;
        $scope.categories = {};

        if (id != 'new') {
            $http.get(consts.apiUrl + '/category/' + id)
                .then(function (response) {
                    $scope.categories = response.data;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        }

        vm.close = function() {
            $uibModalInstance.dismiss();
        }

        $scope.register = function (form) {
            if (id == 'new') {
                $http.post(consts.apiUrl + '/category/', $scope.categories)
                    .then(function (response) {
                        msgs.addSuccess("Categoria cadastrada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Categoria já cadastrada");
                    });
            } else {
                $http.put(consts.apiUrl + '/category/' + id, $scope.categories)
                    .then(function (response) {
                        msgs.addSuccess("Categoria atualizada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Categoria já cadastrada");
                    });
            }
        };               
    }
})();