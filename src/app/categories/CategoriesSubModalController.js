(function () {
    'use strict';

    angular
        .module('finances')
        .controller('CategoriesSubModalController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'id2', 'msgs', '$uibModalInstance', 'auth', CategoriesSubModalController]);


    function CategoriesSubModalController($http, consts, $timeout, $scope, $uibModal, id, id2, msgs, $uibModalInstance, auth) {
        const vm = this;
        $scope.categories = {};
        vm.id = id;
        vm.id2 = id2;

            if (vm.id2 === 'edit')
            $http.get(consts.apiUrl + '/category/' + vm.id)
                .then(function (response) {
                    $scope.categories = response.data;
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        

        vm.close = function() {
            $uibModalInstance.dismiss();
        }

        $scope.register = function (form) {
            if ($scope.categories._dad == null) {                                
                $http.post(consts.apiUrl + '/category/' + vm.id, $scope.categories)
                    .then(function (response) {
                        msgs.addSuccess("Sub-Categoria cadastrada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Sub-Categoria já cadastrada");
                    });                    
            } 
            else {
                $http.put(consts.apiUrl + '/category/' + vm.id, $scope.categories)
                    .then(function (response) {
                        msgs.addSuccess("Sub-Categoria atualizada com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Sub-Categoria já cadastrada");
                    });
            }
        };               
    }
})();