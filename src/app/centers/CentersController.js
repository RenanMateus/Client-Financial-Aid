(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CentersController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$stateParams', '$state', 'msgs', CentersController]);


    function CentersController($http, consts, $timeout, $scope, $uibModal, auth, $stateParams, $state, msgs) {
        const vm = this;
        var page = 1;
        var limit = 10;
        var searchText = undefined;

        $scope.init = function () {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/center-search/' + page, { params: { text: searchText, limit } })
                .then(function (response) {
                    $scope.centers = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Centros cadastrados";
                        $scope.visibleTable = true;
                    };
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Centros cadastrados!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        };
        $scope.init();       

        $scope.deleteCenters = function (id) {
            swal({
                title: "Deseja realmente excluir esse centro de custo/receita?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/center/' + id)
                            .then(function (response) {
                                msgs.addSuccess('Centro de custo/receita excluido com suceeso!');
                                $scope.init();
                            }).catch(function (error) {
                                msgs.addError('Erro ao excluir centro de custo/receita')
                                $scope.init();
                            });
                    } else {
                        swal("Centro não excluido", {
                            icon: 'error'
                        });
                    }
                });
        }

        vm.search = function (searchText) {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/center-search/' + page, { params: { text: searchText, limit } })
                .then(function (response) {
                    $scope.centers = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Centros com essa descrição";
                        $scope.visibleTable = true;
                    };
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Centros com essa descrição";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        }

        vm.nextListCenters = function (currentPage) {
            page = currentPage;
            $scope.init();
        }

        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'centers/centers.new.html',
                controller: 'CentersModalController',
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

    }
})();
