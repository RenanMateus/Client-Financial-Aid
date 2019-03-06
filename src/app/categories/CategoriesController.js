(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CategoriesController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$stateParams', '$state', 'msgs', CategoriesController]);


    function CategoriesController($http, consts, $timeout, $scope, $uibModal, auth, $stateParams, $state, msgs) {
        const vm = this;
        var page = 1;
        var limit = 2000;
        var searchText = undefined;
       
        $scope.init = function () {
            $scope.assyncRequest = false;
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/categories/' + page, { params: {limit} })
                .then(function (response) {
                    $scope.categories = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 2000;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Categorias cadastradas!";
                        $scope.visibleTable = true;
                    };
                    $scope.assyncRequest = true; 
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Categorias!";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true;
                });
        };
        $scope.init();

        $scope.deleteCategory = function (id) {
            swal({
                title: "Deseja realmente excluir a categoria?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/category/' + id)
                            .then(function (response) {
                                msgs.addSuccess("Categoria excluida com sucesso!");
                                $scope.init();
                            }).catch(function (error) {
                                msgs.addError(error.data.error.message);
                                $scope.init();
                            });
                    } else {
                        swal("A categoria não foi excluida", {
                            icon: 'error'
                        });
                    }
                });
        }

        $scope.deleteSubCategory = function (id) {
            swal({
                title: "Deseja realmente excluir a sub-categoria?",
                text: "Não é possível reverter essa operação!",
                icon: "warning",
                buttons: ["Cancelar", "Excluir"],
            })
                .then((isConfirm) => {
                    if (isConfirm) {
                        $http.delete(consts.apiUrl + '/category/' + id)
                            .then(function (response) {
                                msgs.addSuccess("Sub-Categoria excluida com sucesso!");
                                $scope.init();
                            }).catch(function (error) {
                                msgs.addError(error.data.error.message);
                                $scope.init();
                            });
                    } else {
                        swal("A sub-categoria não foi excluida", {
                            icon: 'error'
                        });
                    }
                });
        }

        vm.search = function (searchText) {
            $scope.assyncRequest = false; 
            $scope.visibleTable = false;
            $http.get(consts.apiUrl + '/category-search/' + page, { params: { text: searchText, limit } })
                .then(function (response) {
                    $scope.categories = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 10;
                    if (vm.totalItems == 0) {
                        vm.notifyErro = "Não há Categorias com essa descrição";
                        $scope.visibleTable = true;
                    };
                    $scope.assyncRequest = true; 
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    vm.textErro = "Não há Categorias com essa descrição";
                    $scope.assyncRequest = true;
                    $scope.visibleTable = true; 
                });
        }

        vm.nextListCategories = function (currentPage) {
            page = currentPage;
            $scope.init();
        }

        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'categories/categories.new.html',
                controller: 'CategoriesModalController',
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
                templateUrl: 'categories/categories.edit.html',
                controller: 'CategoriesModalController',
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

        $scope.openModalEditSub = function (id, id2) {
            var modalInstance = $uibModal.open({
                templateUrl: 'categories/categories.editSub.html',
                controller: 'CategoriesSubModalController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: true,
                backdropClass: 'fade',
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    },                    
                    id2: function (){
                        return id2;
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

        $scope.openModalSub = function (id, id2) {
            var modalInstance = $uibModal.open({
                templateUrl: 'categories/categoriesSub.new.html',
                controller: 'CategoriesSubModalController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: true,
                backdropClass: 'fade',
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    },
                    id2: function (){
                        return id2;
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
