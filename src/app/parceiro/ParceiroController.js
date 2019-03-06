(function () {
    'use strict';

    angular
        .module('finances')
        .controller('ParceiroController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$stateParams', '$state', 'msgs', ParceiroController]);


    function ParceiroController($http, consts, $timeout, $scope, $uibModal, auth, $stateParams, $state, msgs) {
        const vm = this;
        var page = 1;
        var limit = 10;
        var searchText = undefined;

        $scope.init = function () {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/partner-search/' + page, { params: { text: searchText, limit } })
                .then(function (response) {
                    $scope.partners = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0){ 
                        vm.notifyErro = "Não há parceiros cadastrado";
                        $scope.visibleTable = true;
                    }
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há parceiros cadastrados!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        };
        $scope.init();

        $scope.deletePartners = function (id) {
            swal({
                title: "Deseja realmente excluir esse cliente/fornecedor?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/partner/' + id)
                            .then(function (response) {
                                msgs.addSuccess('Parceiro excluido com sucesso!');
                                $scope.init();
                            }).catch(function (error) {
                                msgs.addError('Erro ao excluir parceiro')
                                $scope.init();
                            });
                    } else {
                        swal("O cliente/fornecedor não foi excluido", {
                            icon: 'error'
                        });
                    }
                });
        }

        vm.search = function (searchText) {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/partner-search/' + page, { params: { text: searchText, limit } })
                .then(function (response) {
                    $scope.partners = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0){ 
                        vm.notifyErro = "Não há parceiro cadastrado com esse nome";
                        $scope.visibleTable = true;
                    };
                    $scope.assyncRequest = true;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há parceiros cadastrados!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        }

        vm.nextListPartners = function (currentPage) {
            page = currentPage;
            $scope.init();
        }

        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'parceiro/parceiro.new.html',
                controller: 'ParceiroModalController',
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
