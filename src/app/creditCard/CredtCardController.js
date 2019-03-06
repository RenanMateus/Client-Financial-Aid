(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CreditCardController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth','$state','$stateParams', CreditCardController]);


    function CreditCardController($http, consts, $timeout, $scope, $uibModal, auth, $state, $stateParams) {
        const vm = this;
        vm.loading = true;
        $scope.creditCards = {};
        var page = $stateParams.page || 1;
        vm.user = auth.getUser();

        vm.convertCurrency = (amount) =>{
            let value = amount / 100;
            value = value.toString();
            value = value.split('.');
            value = value.length > 1 ? value[1].length == 1 ? value[0] + "," + value[1] + '0' : value[0] + "," + value[1] : value + ",00";
            return value;
        }

        vm.nextCreditCards = function (currentPage) {
            page = currentPage;
            $http.get(consts.apiUrl + '/credit-card/all/' + vm.user._id + '/' + page)
                .then(function (response) {
                    $scope.creditCards = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 20;
                    vm.loading = false;
                }).catch(function (error) {
                    vm.loading = false;
                });
        }
        $scope.init = function () {
            $http.get(consts.apiUrl + '/credit-card/all/' + vm.user._id + '/' + page)
                .then(function (response) {
                    $scope.creditCards = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 20;
                    vm.loading = false;
                }).catch(function (error) {
                    vm.loading = false;
                })
        };

            $scope.init();

        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'creditCard/creditCard.edit.html',
                controller: 'CreditCardModalController',
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
            }, function () {
                    $scope.init();
            }); 
        };

        $scope.openModalNew = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'creditCard/creditCard.new.html',
                controller: 'CreditCardModalController',
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
            }, function () {
                    $scope.init();
            }); 
        };

    }
})();