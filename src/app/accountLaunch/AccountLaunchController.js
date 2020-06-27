(function () {
    'use strict';

    angular
        .module('finances')
        .controller('AccountLaunchController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$state', '$stateParams', 'msgs', AccountLaunchController]);


    function AccountLaunchController($http, consts, $timeout, $scope, $uibModal, auth, $state, $stateParams, msgs) {
        const vm = this;
        var page = 1;
        var limit = 10;
        vm.credit = 0;
        vm.debit = 0;
        var searchText = undefined;
        vm.datehj = new Date();
        vm.end = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
        vm.end.setDate(vm.end.getDate() - 1);
        vm.end.setHours(23, 59);
        vm.start = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
        vm.start.setHours(0);
        vm.idAccount = $stateParams.id;

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
            vm.credit = 0;
            vm.debit = 0;
            vm.end = new Date(vm.end.getFullYear(), (vm.end.getMonth() + 2), 1);
            vm.end.setDate(vm.end.getDate() - 1);
            vm.start = new Date(vm.start.getFullYear(), (vm.start.getMonth() + 1), 1);
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, _account: vm.idAccount } })
                .then(function (response) {
                    $scope.accountLaunch = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Lançamentos entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.accountLaunch.map(element => {
                        if (element.credit) {
                            vm.credit += element.value;
                        } else vm.debit += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Laçamentos!";
                    $scope.visibleTable = true;
                    $scope.assyncRequest = true;
                });
        }
        vm.backDate = function () {
            vm.credit = 0;
            vm.debit = 0;
            vm.end = new Date(vm.end.getFullYear(), (vm.end.getMonth()), 1);
            vm.end.setDate(vm.end.getDate() - 1);
            vm.start = new Date(vm.start.getFullYear(), (vm.start.getMonth() - 1), 1);
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, _account: vm.idAccount } })
                .then(function (response) {
                    $scope.accountLaunch = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Lançamentos entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.accountLaunch.map(element => {
                        if (element.credit) {
                            vm.credit += element.value;
                        } else vm.debit += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Laçamentos!";
                    $scope.visibleTable = true;
                    $scope.assyncRequest = true;
                });
        }

        vm.actuaDate = function () {
            vm.credit = 0;
            vm.debit = 0;
            vm.end = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
            vm.end.setDate(vm.end.getDate() - 1);
            vm.start = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
            vm.end.setHours(23);
            vm.end.setMinutes(59);
            vm.start.setHours(0);
            vm.start.setMinutes(0);

            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, _account: vm.idAccount } })
                .then(function (response) {
                    $scope.accountLaunch = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Lançamentos entre essas datas";
                        $scope.visibleTable = true;
                    };
                    $scope.accountLaunch.map(element => {
                        if (element.credit) {
                            vm.credit += element.value;
                        } else vm.debit += element.value;
                    });
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Laçamentos!";
                    $scope.visibleTable = true;
                    $scope.assyncRequest = true;
                });
        }

        $scope.init = function () {
            if (vm.idAccount === 'id') {
                $state.go("dashboard.account");
            } else {
                vm.end.setHours(23);
                vm.end.setMinutes(59);
                vm.start.setHours(0);
                vm.start.setMinutes(0);

                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, _account: vm.idAccount } })
                    .then(function (response) {
                        vm.credit = 0;
                        vm.debit = 0;
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItems = response.data.total;
                        vm.itemsPerPage = 10;
                        if (vm.totalItems == 0) {
                            vm.notifyErro = "Não há Lançamentos entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.accountLaunch.map(element => {
                            if (element.credit) {
                                vm.credit += element.value;
                            } else vm.debit += element.value;
                        })
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Laçamentos!";
                        $scope.visibleTable = true;
                        $scope.assyncRequest = true;
                    });
            }
        };
        $scope.init();

        $scope.deleteAccountLaunch = function (idTransation) {
            swal({
                title: "Deseja realmente excluir essa transação?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/posting/' + vm.idAccount + '/' + idTransation)
                            .then(function (response) {
                                msgs.addSuccess('Transação excluida com suceeso!');
                                $scope.init();
                            }).catch(function (error) {
                                msgs.addError('Erro ao excluir transação')
                                $scope.init();
                            });
                    } else {
                        swal("A transação não foi excluida", {
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

            $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchText, start: vm.start, end: vm.end, _account: vm.idAccount } })
                .then(function (response) {
                    vm.credit = 0;
                    vm.debit = 0;
                    $scope.accountLaunch = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Lançamentos com essa descrição";
                        $scope.visibleTable = true;
                    };
                    $scope.accountLaunch.map(element => {
                        if (element.credit) {
                            vm.credit += element.value;
                        } else vm.debit += element.value;
                    })
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Laçamentos com essa descrição";
                    $scope.visibleTable = true;
                    $scope.assyncRequest = true;
                });
        }


        vm.nextListAccountLaunch = function (currentPage) {
            page = currentPage;
            $scope.init();
        }

        $scope.openModal = function (id) {
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
                        return (id);
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

        vm.importLaunch = (id) => {
            var modalInstance = $uibModal.open({
                templateUrl: 'accountLaunch/importLaunch.html',
                controller: 'UploadLaunchController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: true,
                backdropClass: 'fade',
                size: 'md',
                resolve: {
                    id: function () {
                        return (id);
                    }
                }
            });
            modalInstance.result.then(function (result) {
            }, function () {
                $scope.init();
            });
        }
    }
})();
