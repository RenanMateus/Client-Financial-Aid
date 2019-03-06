(function () {
    'use strict';

    angular
        .module('finances')
        .controller('AccountController', ['$http', 'consts', '$timeout', '$scope', '$uibModal','auth', '$state', '$stateParams', 'msgs', AccountController]);


    function AccountController($http, consts, $timeout, $scope, $uibModal, auth, $state, $stateParams, msgs) {
        const vm = this;
        var page = 1;
        var limit = 10;
           
        $scope.init = function () {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/accounts/' + page, {params: {limit}})
                .then(function (response) {
                    vm.valueTotal = 0;
                    $scope.account = response.data.result;
                    $scope.account.map( element => {
                        vm.valueTotal += element.balance;
                    });
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10; 
                    $scope.assyncRequest = true;                                 
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textNotify = "Não há contas cadastradas";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        };
        $scope.init();

        $scope.deleteAccount = function (id) {
            swal({
                title: "Deseja realmente excluir conta?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/account/' + id)
                        .then(function (response) {
                            msgs.addSuccess("Conta excluida com sucesso!");                            
                            window.location.reload(true);
                        }).catch(function (error) {
                            msgs.addError(error.data.error.message);
                            $scope.init();
                        });
                    } else {
                        swal("A conta não foi excluida", {
                            icon: 'error'
                        });
                    }
                });            
        }

        vm.nextListAccount= function (currentPage) {
            page = currentPage;
            $scope.init();
        }

        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'account/account.new.html',
                controller: 'AccountModalController',
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

        $scope.openModalEdit = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'account/account.edit.html',
                controller: 'AccountModalController',
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
