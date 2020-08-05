(function () {
    'use strict';

    angular
        .module('finances')
        .controller('BillsRecipeModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', '$state', BillsRecipeModalController]);


    function BillsRecipeModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth, $state) {
        const vm = this;
        var page = 1;
        var limit = 1000;
        vm.dateHj = new Date();
        $scope.billsRecipe = {
            credit: true,
            ok: false,
            type: 'Normal',
            payday: new Date(),
            dueDate: new Date()
        };
        $scope.categories = {};
        $scope.clientPartners = {};
        $scope.centerRevenue = {};
        $scope.accounts = {};
        vm.accountLaunch = {
            credit: true,
            value: 0,
            description: '',
            date: new Date(),
            docNumber: '',
            _account: undefined,
            _category: undefined,
            _partner: undefined,
            _center: undefined
        }
        vm.idAccount = null;
        $scope.contaRecebida = false;

        $http.get(consts.apiUrl + '/accounts/')
            .then(function (response) {
                $scope.accounts = response.data.result;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/revenue-center/')
            .then(function (response) {
                $scope.centerRevenue = response.data.result;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/client-partner/')
            .then(function (response) {
                $scope.clientPartners = response.data.result;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/get-categories/' + page, { params: { limit } })
            .then(function (response) {
                $scope.categories = response.data.result;
                vm.pages = response.data.pages;
                vm.totalItems = response.data.total;
                vm.itemsPerPage = 1000;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + "/file-bill/" + id)
            .then(function (result) {
                vm.anexos = result.data;
            }).catch(function (err) {
            })

        if (id != 'new') {
            $http.get(consts.apiUrl + '/bill/' + id)
                .then(function (response) {
                    $scope.billsRecipe = response.data;
                    $scope.billsRecipe.payday = vm.dateHj;
                    $scope.billsRecipe.total = $scope.billsRecipe.value;
                    $scope.billsRecipe.dueDate = new Date($scope.billsRecipe.dueDate);
                    $scope.billsRecipe.payday = new Date($scope.billsRecipe.payday);
                    if ($scope.billsRecipe.docDate)
                        $scope.billsRecipe.docDate = new Date($scope.billsRecipe.docDate);
                    if ($scope.billsRecipe.month)
                        $scope.billsRecipe.month = new Date($scope.billsRecipe.month);
                    if ($scope.billsRecipe.ok)
                        $scope.contaRecebida = true;

                    if ($scope.billsRecipe._conciliation != null) {
                        $http.get(consts.apiUrl + '/conciliation/' + $scope.billsRecipe._conciliation)
                            .then(function (response) {
                                $scope.conciliationRecipe = response.data;
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
        }

        $scope.register = function (form) {
            if ($scope.billsRecipe._category === '') $scope.billsRecipe._category = undefined;
            if ($scope.billsRecipe._partner === '') $scope.billsRecipe._partner = undefined;
            if ($scope.billsRecipe._center === '') $scope.billsRecipe._center = undefined;

            if (id == 'new') {
                $scope.billsRecipe.value = parseFloat($scope.billsRecipe.value);
                if ($scope.billsRecipe.total) {
                    $scope.billsRecipe.total = parseFloat($scope.billsRecipe.total);
                }

                $http.post(consts.apiUrl + '/bill/', $scope.billsRecipe)
                    .then(function (response) {
                        msgs.addSuccess("Receita criada com sucesso!");

                        if ($scope.billsRecipe.ok) {
                            vm.accountLaunch.value = $scope.billsRecipe.value;
                            vm.accountLaunch.description = $scope.billsRecipe.description;
                            vm.accountLaunch.date = $scope.billsRecipe.dueDate;
                            vm.accountLaunch.docNumber = $scope.billsRecipe.docNumber;
                            vm.accountLaunch._account = vm.idAccount;
                            vm.accountLaunch._category = $scope.billsRecipe._category;
                            vm.accountLaunch._partner = $scope.billsRecipe._partner;
                            vm.accountLaunch._center = $scope.billsRecipe._center;
                            $http.post(consts.apiUrl + '/posting/' + vm.idAccount, vm.accountLaunch)
                                .then(function (response) {
                                    $uibModalInstance.dismiss();
                                }).catch(function (error) {
                                    msgs.addError("Erro ao criar a movimentação bancária");
                                });
                        }
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Erro interno no servidor");
                    });
            } else {
                if ($scope.billsRecipe.total) {
                    $scope.billsRecipe.total = parseFloat($scope.billsRecipe.total);
                }
                $http.put(consts.apiUrl + '/bill/' + id, $scope.billsRecipe)
                    .then(function (response) {
                        msgs.addSuccess("Receita atualizada com sucesso!");

                        if ($scope.billsRecipe.ok) {
                            vm.accountLaunch.value = $scope.billsRecipe.value;
                            vm.accountLaunch.description = $scope.billsRecipe.description;
                            vm.accountLaunch.date = $scope.billsRecipe.dueDate;
                            vm.accountLaunch.docNumber = $scope.billsRecipe.docNumber;
                            vm.accountLaunch._account = vm.idAccount;
                            vm.accountLaunch._category = $scope.billsRecipe._category;
                            vm.accountLaunch._partner = $scope.billsRecipe._partner;
                            vm.accountLaunch._center = $scope.billsRecipe._center;
                            $http.post(consts.apiUrl + '/posting/' + vm.idAccount, vm.accountLaunch)
                                .then(function (response) {
                                    $uibModalInstance.dismiss();
                                }).catch(function (error) {
                                    msgs.addError("Erro ao criar a movimentação bancária");
                                });
                        }
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Erro interno no servidor");
                    });
            }
        };

        vm.deleteAnexo = function (id) {
            swal({
                title: "Deseja realmente excluir esse anexo?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/file-bill/' + id)
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
                templateUrl: 'billsRecipe/uploadModal.html',
                controller: 'UploadModalController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: 'static',
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
            window.open(consts.apiUrl + "/file-bill/" + id + '?token=' + auth.getUser().token);
        }


        // #### REDIRECIONA O USUÁRIO PARA A PAGINA DE EDITAR as Movimentações  ####
        $scope.open = function (id) {
            if ($scope.conciliationRecipe.transaction.credit === true) {
                $uibModalInstance.dismiss();
                $state.go("dashboard.accountLaunch");
                $scope.openEditLaunch = function (id) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'accountLaunch/accountLaunch.new.html',
                        controller: 'AccountLaunchModalController',
                        controllerAs: 'vm',
                        windowClass: '',
                        backdrop: 'static',
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
                $scope.openEditLaunch(id)
            }

            if ($scope.conciliationRecipe.transaction.credit === false) {
                $uibModalInstance.dismiss();
                $state.go("dashboard.accountLaunch");
                $scope.openEditLaunch = function (id) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'accountLaunch/accountLaunch.new.html',
                        controller: 'AccountLaunchModalController',
                        controllerAs: 'vm',
                        windowClass: '',
                        backdrop: 'static',
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
                $scope.openEditLaunch(id)
            }
        }
    }
})();