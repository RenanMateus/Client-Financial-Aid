(function () {
    'use strict';

    angular
        .module('finances')
        .controller('FixedExpenseCardController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth','$state','$stateParams', FixedExpenseCardController]);


    function FixedExpenseCardController($http, consts, $timeout, $scope, $uibModal, auth, $stateParams, $state) {
        const vm = this;
        vm.loading = true;
        vm.fixedExpensesCard = {};
        vm.creditCard = {};
        var page = $stateParams.page || 1;
        vm.user = auth.getUser();

        $http.get(consts.apiUrl + '/credit-cards/' + vm.user._id).then(function(req){            
            vm.creditCard = req.data;
        }).catch(function(error){
        });

        vm.convertCurrency = (amount) =>{
            let value = amount / 100;
            value = value.toString();
            value = value.split('.');
            value = value.length > 1 ? value[1].length == 1 ? value[0] + "," + value[1] + '0' : value[0] + "," + value[1] : value + ",00";
            return value;
        }

        vm.nextFixedExpense = function (currentPage) {
            page = currentPage;
            $http.get(consts.apiUrl + '/fixed-expense/all/' + vm.user._id + '/' + page)
                .then(function (response) {
                    vm.fixedExpensesCard = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 20;
                    vm.loading = false;
                }).catch(function (error) {
                    vm.loading = false;
                });
        }
        
        $scope.init = function () {
            vm.getCards = function(c){
            $http.get(consts.apiUrl + '/fixed-expense/all/' + c._id + '/' + page)
                .then(function (response) {
                    vm.fixedExpensesCard = response.data.result;
                    vm.pages = response.data.pages;
                    vm.totalItems = response.data.total;
                    vm.itemsPerPage = 20;
                    vm.loading = false;
                }).catch(function (error) {
                    vm.loading = false;
                })
        }
    };

            $scope.init();
            console.log(vm.fixedExpensesCard);
        $scope.openModal = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'fixedExpenseCard/fixedExpenseCard.edit.html',
                controller: 'FixedExpenseCardModalController',
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
                templateUrl: 'fixedExpenseCard/fixedExpenseCard.new.html',
                controller: 'FixedExpenseCardModalController',
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
