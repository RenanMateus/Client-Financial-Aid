(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CentersModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', CentersModalController]);


    function CentersModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth) {
        const vm = this;
        $scope.centers = {            
            revenue: false,
            cost: false
        };

        if (id != 'new') {
            $http.get(consts.apiUrl + '/center/' + id)
                .then(function (response) {
                    $scope.centers = response.data;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        }

        vm.close = function() {
            $uibModalInstance.dismiss();
        }

        $scope.register = function (form) {
            if (id == 'new') {
                $http.post(consts.apiUrl + '/center/', $scope.centers)
                    .then(function (response) {
                        msgs.addSuccess("Centro Cadastrado com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Centro já cadastrado!");
                    });
            } else {
                $http.put(consts.apiUrl + '/center/' + id, $scope.centers)
                    .then(function (response) {
                        msgs.addSuccess("Centro atualizado com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Centro já cadastrado!");
                    });
            }
        };    
    }
})();