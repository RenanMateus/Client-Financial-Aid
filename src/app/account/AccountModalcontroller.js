(function () {
    'use strict';

    angular
        .module('finances')
        .controller('AccountModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', AccountModalController]);


    function AccountModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth) {
        const vm = this;
        $scope.account = {};

        if (id != 'new') {
            $http.get(consts.apiUrl + '/account/' + id)
                .then(function (response) {
                    $scope.account = response.data;
                }).catch(function (error) {
                    msgs.addError(error.data.error.message);
                });
        }

        vm.close = function() {
            $uibModalInstance.dismiss();
        };

        $scope.register = function (form) {
            if (id == 'new') {               
                $http.post(consts.apiUrl + '/account/', $scope.account)
                    .then(function (response) {
                        msgs.addSuccess("Conta cadastrada com sucesso!");
                        $uibModalInstance.dismiss();
                        window.location.reload(true);
                    }).catch(function (error) {
                        msgs.addError("Conta já cadastrada.");
                    });
            } else {
                $http.put(consts.apiUrl + '/account/' + id, $scope.account)
                    .then(function (response) {
                        msgs.addSuccess("Conta atualizada com sucesso!");
                        $uibModalInstance.dismiss();
                        window.location.reload(true);
                    }).catch(function (error) {
                        msgs.addError("Conta já cadastrada!");
                    });
            }
        };                       
    }
})();