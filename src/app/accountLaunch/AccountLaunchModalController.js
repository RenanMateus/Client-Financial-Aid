(function () {
    'use strict';

    angular
        .module('finances')
        .controller('AccountLaunchModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', '$stateParams', '$state', AccountLaunchModalController]);


    function AccountLaunchModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth, $stateParams, $state) {
        const vm = this;
        var page = 1;
        var limit = 1000;
        let idTransation = id;
        let idAccount = $stateParams.id
        $scope.conciliation = {};
        $scope.categories = {};
        $scope.centerCost = {};
        $scope.centerRevenue = {};
        $scope.providerPartners = {};
        $scope.clientPartners = {};

        $scope.accountLaunch = {
            _account: idAccount,
            credit: true,
            date: new Date()
        };

        $http.get(consts.apiUrl + '/get-categories/' + page, { params: { limit } })
            .then(function (response) {
                $scope.categories = response.data.result;
                vm.pages = response.data.pages;
                vm.totalItems = response.data.total;
                vm.itemsPerPage = 1000;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/cost-center')
            .then(function (response) {
                $scope.centerCost = response.data.result;
            }).catch(function (error) {
            });
        $http.get(consts.apiUrl + '/revenue-center')
            .then(function (response) {
                $scope.centerRevenue = response.data.result;
            }).catch(function (error) {
            });
        $http.get(consts.apiUrl + '/provider-partner')
            .then(function (response) {
                $scope.providerPartners = response.data.result;
            }).catch(function (error) {
            });
        $http.get(consts.apiUrl + '/client-partner')
            .then(function (response) {
                $scope.clientPartners = response.data.result;
            }).catch(function (error) {
            });
        $http.get(consts.apiUrl + "/file-transaction/" + idTransation)
            .then(function (result) {
                vm.anexos = result.data;
            }).catch(function (err) {
            })

        if (id != 'new') {
            $http.get(consts.apiUrl + '/posting/' + idTransation)
                .then(function (response) {
                    $scope.accountLaunch = response.data;
                    $scope.accountLaunch.date = new Date($scope.accountLaunch.date);
                    if ($scope.accountLaunch.month)
                        $scope.accountLaunch.month = new Date($scope.accountLaunch.month);

                    if ($scope.accountLaunch._conciliation != null) {
                        $http.get(consts.apiUrl + '/conciliation/' + $scope.accountLaunch._conciliation)
                            .then(function (response) {
                                $scope.conciliation = response.data;
                            }).catch(function (error) {
                                msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                            });
                    }
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        }

        vm.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.register = function (form) {
            $scope.accountLaunch.value = parseFloat($scope.accountLaunch.value);
            if ($scope.accountLaunch.credit === 'true') $scope.accountLaunch.credit = true;
            if ($scope.accountLaunch.credit === 'false') $scope.accountLaunch.credit = false;
            if ($scope.accountLaunch._category === "") $scope.accountLaunch._category = undefined;
            if ($scope.accountLaunch._partner === "") $scope.accountLaunch._partner = undefined;
            if ($scope.accountLaunch._center === "") $scope.accountLaunch._center = undefined;
            if (id == 'new') {
                $http.post(consts.apiUrl + '/posting/' + idAccount, $scope.accountLaunch)
                    .then(function (response) {
                        msgs.addSuccess("Transação cadastrada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Transação já existente!");
                    });
            } else {
                $scope.accountLaunch.value = parseFloat($scope.accountLaunch.value);
                $http.put(consts.apiUrl + '/posting/' + idAccount + '/' + idTransation, $scope.accountLaunch)
                    .then(function (response) {
                        msgs.addSuccess("Transação atualizada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Transação já existente!");
                    });
            }
        };


        // #### REDIRECIONA O USUÁRIO PARA A PAGINA DE EDITAR LANÇAMENTOS  ####
        $scope.open = function (id) {
            if ($scope.conciliation.bill.credit === true) {
                $uibModalInstance.dismiss();
                $state.go("dashboard.billsRecipe");
                $scope.openEditRecipe = function (id) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'billsRecipe/billsRecipeEdit.html',
                        controller: 'BillsRecipeModalController',
                        controllerAs: 'vm',
                        windowClass: '',
                        backdrop: true,
                        backdropClass: 'fade',
                        size: 'lg',
                        resolve: {
                            id: function () {
                                return id;
                            }
                        }
                    });
                    modalInstance.result.then(function (result) {
                    }, function () {
                        setTimeout(function () {
                            $scope.init();
                        }, 300);
                    });
                };
                $scope.openEditRecipe(id)
            }

            if ($scope.conciliation.bill.credit === false) {
                $uibModalInstance.dismiss();
                $state.go("dashboard.billsExpense");
                $scope.openEditExpense = function (id) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'billsExpense/billsExpense.edit.html',
                        controller: 'BillsExpenseModalController',
                        controllerAs: 'vm',
                        windowClass: '',
                        backdrop: true,
                        backdropClass: 'fade',
                        size: 'lg',
                        resolve: {
                            id: function () {
                                return id;
                            }
                        }
                    });
                    modalInstance.result.then(function (result) {
                    }, function () {
                        setTimeout(function () {
                            $scope.init();
                        }, 300);
                    });
                };
                $scope.openEditExpense(id)
            }
        }

        vm.deleteAnexo = function (id) {
            swal({
                title: "Deseja realmente excluir esse anexo?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/file-transaction/' + id)
                            .then(function (response) {
                                msgs.addSuccess('Anexo removido com sucesso');
                                $uibModalInstance.dismiss();
                            })
                            .catch(function (err) {
                                msgs.addError('Não foi possível remover esse anexo!')
                            });
                    } else {
                        swal("O anexo não foi excluido", {
                            icon: 'error'
                        });
                    }
                });
        }

        vm.openModal = (id) => {
            $uibModalInstance.dismiss();
            var modalInstance = $uibModal.open({
                templateUrl: 'accountLaunch/uploadModal.html',
                controller: 'UploadTransactionModalController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: true,
                backdropClass: 'fade',
                size: 'md',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (result) {
            }, function (value) {
                vm.close();
            });
        }

        $scope.openAnexo = function (id) {
            window.open(consts.apiUrl + "/file-transaction/" + id + '?token=' + auth.getUser().token);                      
        }
    }
})();