(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CardExpenseModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$state', '$uibModalInstance', 'auth', CardExpenseModalController]);


    function CardExpenseModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $state, $uibModalInstance, auth) {
        const vm = this;
        var id = id;
        vm.categorieExpense = [];
        vm.creditCard = [];
        vm.user = auth.getUser();
        vm.cardExpense = [];
        console.log(id);

        $http.get(consts.apiUrl + '/categorieExpenseListAll').then(function (req) {
            vm.categorieExpense = req.data;
        }).catch(function (error) {
        });

        $http.get(consts.apiUrl + '/credit-cards/' + vm.user._id).then(function (req) {
            vm.creditCard = req.data;
        }).catch(function (error) {
        });


        if (id != 'new') {
            $http.get(consts.apiUrl + '/card-expense/' + id)
                .then(function (response) {
                    vm.cardExpense = response.data;
                }).catch(function (error) {
                    msgs.addError(error.data.error.message || "Erro inesperado no servidor, por favor, contate o suporte");
                });
        }

        vm.saveCardExpense = function (form) {
            if (id == 'new') {
                console.log(vm.creditCard);
                $http.post(consts.apiUrl + '/card-expense', {
                    value: vm.cardExpense.value,
                    date: vm.cardExpense.date,
                    description: vm.cardExpense.description,
                    _categorie: vm.categorie,
                    _card: vm.card,
                    _user: vm.user._id
                })
                    .then(function (response) {
                        msgs.addSuccess("Despesa de cartão cadastrada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError(error.data.error.message || "Erro inesperado no servidor, por favor, contate o suporte");
                    });
            } else if (id != 'new') {
                $http.put(consts.apiUrl + '/card-expense/' + id, {
                    value: vm.cardExpense.value,
                    date: vm.cardExpense.date,
                    description: vm.cardExpense.description,
                    _categorie: vm.categorie,
                    _card: vm.card,
                    _user: vm.user._id
                })
                    .then(function (response) {
                        msgs.addSuccess("Despesa de cartão atualizada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError(error.data.message || "Erro inesperado no servidor, por favor, contate o suporte");
                    });
            }
        };

        vm.deleteCardExpense = function (form) {

            $http.delete(consts.apiUrl + '/card-expense/' + id)
                .then(function (req) {
                    msgs.addSuccess("Despesa de cartão Excluida com sucesso!");
                    $uibModalInstance.dismiss();
                }).catch(function (error) {

                });
        }
    }
})();