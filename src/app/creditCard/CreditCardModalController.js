(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CreditCardModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$state', '$uibModalInstance', 'auth', CreditCardModalController]);


    function CreditCardModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $state, $uibModalInstance, auth) {
        const vm = this;
        var id = id;
        vm.account = [];
        vm.user = auth.getUser();
        console.log(id);
        
        $http.get(consts.apiUrl + '/accountListAll').then(function(req){
            vm.account = req.data;
        }).catch(function(error){
        });


        if (id != 'new') {
            $http.get(consts.apiUrl + '/credit-card/' + id)
                .then(function (response) {
                    vm.creditCard = response.data;
                }).catch(function (error) {
                    msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                });
        }

        vm.saveCard = function (form) {
            if (id == 'new') {
                $http.post(consts.apiUrl + '/credit-card/', {
                    name: vm.creditCard.name,
                    limit: vm.creditCard.limit,
                    brand: vm.creditCard.brand,
                    payday: vm.creditCard.payday,
                    closingDay: vm.creditCard.closingDay,
                    _account: vm.conta,
                    _user: vm.user._id
                })
                    .then(function (response) {
                        msgs.addSuccess("Cartão de Crédito cadastrado com sucesso!");
                        console.log(vm.creditCard);
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                    });
            } else if (id != 'new') {
                $http.put(consts.apiUrl + '/credit-card/' + id, vm.creditCard)
                    .then(function (response) {
                        msgs.addSuccess("Cartão de Crédito atualizado com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                    });
            }
        };

        vm.deleteCard = function (form) {

            $http.delete(consts.apiUrl + '/credit-card/' + id)
                .then(function (req) {
                    msgs.addSuccess("Cartão de Crédito Excluido com sucesso!");
                    $uibModalInstance.dismiss();
                }).catch(function (error) {

                });
        }
    }
})();