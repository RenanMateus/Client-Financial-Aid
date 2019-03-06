(function () {
    'use strict';

    angular
        .module('finances')
        .controller('FixedExpenseCardModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$state', '$uibModalInstance', 'auth', FixedExpenseCardModalController]);


    function FixedExpenseCardModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $state, $uibModalInstance, auth) {
        const vm = this;
        var id = id;
        vm.categorieExpense = [];
        vm.creditCard = [];
        vm.user = auth.getUser();
        console.log(id);
        
        $http.get(consts.apiUrl + '/categories-expenses/' + vm.user._id).then(function(req){
            vm.categorieExpense = req.data;
        }).catch(function(error){
        });

        $http.get(consts.apiUrl + '/credit-cards/' + vm.user._id).then(function(req){            
            vm.creditCard = req.data;
        }).catch(function(error){
        });

        if (id != 'new') {
            $http.get(consts.apiUrl + '/fixed-expense/' + id)
                .then(function (response) {
                    vm.fixedExpenseCard = response.data;
                }).catch(function (error) {
                    msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                });
        }

        vm.saveFixedExpenseCard = function (form) {
            if (id == 'new') {
                $http.post(consts.apiUrl + '/fixed-expense', {
                    description: vm.fixedExpenseCard.description,
                    payday: vm.fixedExpenseCard.payday,
                    value: vm.fixedExpenseCard.value,
                    _categorie: vm.categorie,
                    _nameCard: vm.card,
                    _user: vm.user._id
                })
                    .then(function (response) {
                        msgs.addSuccess("Despesa fixa do cartão cadastrada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                    });
            } else if (id != 'new') {
                $http.put(consts.apiUrl + '/fixed-expense/' + id, vm.fixedExpenseCard)
                    .then(function (response) {
                        msgs.addSuccess("Despesa fixa do cartão atualizada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                    });
            }
        };

        vm.deleteFixedExpenseCard = function (form) {
            $http.delete(consts.apiUrl + '/fixed-expense/' + id)
                .then(function (req) {
                    msgs.addSuccess("Despesa fixa do cartão excluida com sucesso!");
                    $uibModalInstance.dismiss();
                }).catch(function (error) {

                });
        }
    }
})();