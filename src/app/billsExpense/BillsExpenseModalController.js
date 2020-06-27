(function () {
    'use strict';

    angular
        .module('finances')
        .controller('BillsExpenseModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', '$state', BillsExpenseModalController]);


    function BillsExpenseModalController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth, $state) {
        const vm = this;
        var page = 1;
        var limit = 1000;
        vm.dateHj = new Date();
        $scope.billsExpense = {
            credit: false,
            ok: false,
            type: 'Normal',
            dueDate: new Date(),
            payday: new Date()
        };
        $scope.categories = {};
        $scope.providerPartners = {};
        $scope.centerCost = {};
        $scope.accounts = {};
        vm.accountLaunch = {
            credit: false,
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

        $http.get(consts.apiUrl + '/accounts/')
            .then(function (response) {
                $scope.accounts = response.data.result;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/cost-center/')
            .then(function (response) {
                $scope.centerCost = response.data.result;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/provider-partner/')
            .then(function (response) {
                $scope.providerPartners = response.data.result;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + '/get-categories/' + page, { params: { limit } })
            .then(function (response) {
                $scope.categories = response.data.result;
                vm.pages = response.data.pages;
                console.log("categorias", $scope.categories);
                vm.totalItems = response.data.total;
                vm.itemsPerPage = 1000;
            }).catch(function (error) {
            });

        $http.get(consts.apiUrl + "/file-bill/" + id)
            .then(function (result) {
                vm.anexos = result.data;
            }).catch(function (err) {
            })

        $scope.correctMoney = function (value) {
            var formato = { minimumFractionDigits: 2, styleF: 'currency', currency: 'BRL' }
            var money = (value).toLocaleString('pt-BR', formato);
            return money;
        };

        if (id != 'new') {
            $http.get(consts.apiUrl + '/bill/' + id)
                .then(function (response) {
                    $scope.billsExpense = response.data;
                    $scope.billsExpense.payday = vm.dateHj;
                    $scope.billsExpense.total = $scope.billsExpense.value;
                    $scope.billsExpense.dueDate = new Date($scope.billsExpense.dueDate);
                    $scope.billsExpense.payday = new Date($scope.billsExpense.payday);
                    if ($scope.billsExpense.docDate)
                        $scope.billsExpense.docDate = new Date($scope.billsExpense.docDate);
                    if ($scope.billsExpense.month)
                        $scope.billsExpense.month = new Date($scope.billsExpense.month);

                    if ($scope.billsExpense._conciliation != null) {
                        $http.get(consts.apiUrl + '/conciliation/' + $scope.billsExpense._conciliation)
                            .then(function (response) {
                                $scope.conciliation = response.data;
                            }).catch(function (error) {
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
            if ($scope.billsExpense._category === '') $scope.billsExpense._category = undefined;
            if ($scope.billsExpense._partner === '') $scope.billsExpense._partner = undefined;
            if ($scope.billsExpense._center === '') $scope.billsExpense._center = undefined;

            if (id == 'new') {
                $scope.billsExpense.value = parseFloat($scope.billsExpense.value);
                if ($scope.billsExpense.total) {
                    $scope.billsExpense.total = parseFloat($scope.billsExpense.total);
                }
                $http.post(consts.apiUrl + '/bill/', $scope.billsExpense)
                    .then(function (response) {
                        msgs.addSuccess("Despesa criada com sucesso!");

                        if ($scope.billsExpense.ok) {
                            vm.accountLaunch.value = $scope.billsExpense.value;
                            vm.accountLaunch.description = $scope.billsExpense.description;
                            vm.accountLaunch.date = $scope.billsExpense.dueDate;
                            vm.accountLaunch.docNumber = $scope.billsExpense.docNumber;
                            vm.accountLaunch._account = vm.idAccount;
                            vm.accountLaunch._category = $scope.billsExpense._category;
                            vm.accountLaunch._partner = $scope.billsExpense._partner;
                            vm.accountLaunch._center = $scope.billsExpense._center;
                            $http.post(consts.apiUrl + '/posting/' + vm.idAccount, vm.accountLaunch)
                                .then(function (response) {
                                    $uibModalInstance.dismiss();
                                }).catch(function (error) {
                                    msgs.addError("Erro ao criar o lançamento bancário");
                                });
                        }
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Erro interno no servidor");
                    });
            } else {
                $http.put(consts.apiUrl + '/bill/' + id, $scope.billsExpense)
                    .then(function (response) {
                        msgs.addSuccess("Despesa atualizada com sucesso!");

                        if ($scope.billsExpense.ok) {
                            vm.accountLaunch.value = $scope.billsExpense.value;
                            vm.accountLaunch.description = $scope.billsExpense.description;
                            vm.accountLaunch.date = $scope.billsExpense.dueDate;
                            vm.accountLaunch.docNumber = $scope.billsExpense.docNumber;
                            vm.accountLaunch._account = vm.idAccount;
                            vm.accountLaunch._category = $scope.billsExpense._category;
                            vm.accountLaunch._partner = $scope.billsExpense._partner;
                            vm.accountLaunch._center = $scope.billsExpense._center;
                            $http.post(consts.apiUrl + '/posting/' + vm.idAccount, vm.accountLaunch)
                                .then(function (response) {
                                    $uibModalInstance.dismiss();
                                }).catch(function (error) {
                                    msgs.addError("Erro ao criar o lançamento bancário");
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
                templateUrl: 'billsExpense/uploadModal.html',
                controller: 'UploadModalController',
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
            window.open(consts.apiUrl + "/file-bill/" + id + '?token=' + auth.getUser().token);
        }

        // #### REDIRECIONA O USUÁRIO PARA A PAGINA DE EDITAR LANÇAMENTOS  ####
        $scope.open = function (id) {
            if ($scope.conciliation.transaction.credit === true) {
                $uibModalInstance.dismiss();
                $state.go("dashboard.accountLaunch");
                $scope.openEditLaunch = function (id) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'accountLaunch/accountLaunch.new.html',
                        controller: 'AccountLaunchModalController',
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
                $scope.openEditLaunch(id)
            }

            if ($scope.conciliation.transaction.credit === false) {
                $uibModalInstance.dismiss();
                $state.go("dashboard.accountLaunch");
                $scope.openEditLaunch = function (id) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'accountLaunch/accountLaunch.new.html',
                        controller: 'AccountLaunchModalController',
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
                $scope.openEditLaunch(id)
            }
        }
    }
})();