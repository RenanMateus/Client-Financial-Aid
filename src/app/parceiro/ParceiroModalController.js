(function () {
    'use strict';

    angular
        .module('finances')
        .controller('ParceiroModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', ParceiroModalController]);


    function ParceiroModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth) {
        const vm = this;
        $scope.partners = {
            type: 'Pessoa Fisica',
            client: false,
            provider: false,
            country: 'Brasil'
        };

        if (id != 'new') {
            $http.get(consts.apiUrl + '/partner/' + id)
                .then(function (response) {
                    $scope.partners = response.data;
                }).catch(function (error) {
                     msgs.addError(error.data.error.message);
                });
        }

        vm.close = function() {
            $uibModalInstance.dismiss();
        }

        $scope.register = function (form) {
            if (id == 'new') {
                $http.post(consts.apiUrl + '/partner/', $scope.partners)
                    .then(function (response) {
                        msgs.addSuccess("Parceiro cadastrado com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Parceiro já cadastrado!");
                    });
            } else {
                $http.put(consts.apiUrl + '/partner/' + id, $scope.partners)
                    .then(function (response) {
                        msgs.addSuccess("Parceiro alterado com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("CPF/CNPJ já cadastrado!");
                    });
            }
        };         
        
        vm.changeCEP = function(cep){
            if($scope.partners.country === 'Brasil' || $scope.partners.country === 'brasil') {
            $http.get(consts.apiUrl + '/consultcep/' + cep)
            .then(response =>{
                $scope.partners.address = response.data.logradouro;
                $scope.partners.district = response.data.bairro;
                $scope.partners.city = response.data.localidade;
                $scope.partners.state = response.data.uf;
            }).catch(error =>{                
            })
        }
    }
}
})();