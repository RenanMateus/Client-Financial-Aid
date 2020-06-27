(function () {
    'use strict';

    angular
        .module('finances')
        .controller('BillsExpenseController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$stateParams', '$state', 'msgs', BillsExpenseController]);


    function BillsExpenseController($http, consts, $timeout, $scope, $uibModal, auth, $stateParams, $state, msgs) {
        const vm = this;
        var page = 1;
        var limit = 10;
        var credit = false;
        var searchText = undefined;
        vm.valueTotal = 0;
        vm.datehj = new Date();
        vm.end = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
        vm.end.setDate(vm.end.getDate() - 1);
        vm.end.setHours(23, 59);
        vm.start = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
        vm.start.setHours(0);

        // Pegar o mês e ano atual
        if ((new Date().getMonth() + 1) == 1) {
            vm.month = ('Janeiro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 2) {
            vm.month = ('Fevereiro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 3) {
            vm.month = ('Março de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 4) {
            vm.month = ('Abril de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 5) {
            vm.month = ('Maio de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 6) {
            vm.month = ('Junho de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 7) {
            vm.month = ('Julho de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 8) {
            vm.month = ('Agosto de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 9) {
            vm.month = ('Setembro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 10) {
            vm.month = ('Outubro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 11) {
            vm.month = ('Novembro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 12) {
            vm.month = ('Dezembro de ' + new Date().getFullYear());
        }

        vm.nextDate = function () {
            vm.end = new Date(vm.end.getFullYear(), (vm.end.getMonth() + 2), 1);
            vm.end.setDate(vm.end.getDate() - 1);
            vm.start = new Date(vm.start.getFullYear(), (vm.start.getMonth() + 1), 1);
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, limit, credit } })
                .then(function (response) {
                    vm.valueTotal = 0;
                    $scope.billsExpense = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há contas para pagar entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.billsExpense.map(element => {
                        element.dueDate = new Date(element.dueDate);
                    });
                    $scope.billsExpense.map(element => {
                        vm.valueTotal += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Contas!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        }
        vm.backDate = function () {
            vm.end = new Date(vm.end.getFullYear(), (vm.end.getMonth()), 1);
            vm.end.setDate(vm.end.getDate() - 1);
            vm.start = new Date(vm.start.getFullYear(), (vm.start.getMonth() - 1), 1);
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, limit, credit } })
                .then(function (response) {
                    vm.valueTotal = 0;
                    $scope.billsExpense = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há contas para pagar entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.billsExpense.map(element => {
                        element.dueDate = new Date(element.dueDate);
                    });
                    $scope.billsExpense.map(element => {
                        vm.valueTotal += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Contas!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        }

        vm.actuaDate = function () {
            vm.end = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
            vm.end.setDate(vm.end.getDate() - 1);
            vm.start = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, limit, credit } })
                .then(function (response) {
                    vm.valueTotal = 0;
                    $scope.billsExpense = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há contas para pagar entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.billsExpense.map(element => {
                        element.dueDate = new Date(element.dueDate);
                    });
                    $scope.billsExpense.map(element => {
                        vm.valueTotal += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Contas!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        }

        $scope.init = function () {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, limit, credit } })
                .then(function (response) {
                    vm.valueTotal = 0;
                    $scope.billsExpense = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há contas para pagar entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.billsExpense.map(element => {
                        element.dueDate = new Date(element.dueDate);
                    });
                    $scope.billsExpense.map(element => {
                        vm.valueTotal += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Contas!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        };
        $scope.init();

        $scope.deleteBillsExpense = function (id) {
            swal({
                title: "Deseja realmente excluir essa despesa?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/bill/' + id)
                            .then(function (response) {
                                msgs.addSuccess('Conta excluida com sucesso!')
                                $scope.init();
                            }).catch(function (error) {
                                msgs.addError("Erro ao excluir conta!");
                                $scope.init();
                            });
                    } else {
                        swal("A Despesa não foi excluida", {
                            icon: 'error'
                        });
                    }
                });
        }

        vm.search = function (searchText) {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, limit, credit } })
                .then(function (response) {
                    vm.valueTotal = 0;
                    $scope.billsExpense = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Contas com essa descrição";
                        $scope.visibleTable = true;
                    };
                    $scope.billsExpense.map(element => {
                        element.dueDate = new Date(element.dueDate);
                    });
                    $scope.billsExpense.map(element => {
                        vm.valueTotal += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Contas com essa descrição";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        }

        vm.nextListBillsExpense = function (currentPage) {
            page = currentPage;
            $scope.init();
        }

        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'billsExpense/billsExpense.new.html',
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

        $scope.openEdit = function (id) {
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
    }
})();
