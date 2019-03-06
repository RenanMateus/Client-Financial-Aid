(function () {
    'use strict';

    angular
        .module('finances')
        .controller('UserEditController', ['$scope', '$state', '$http', 'consts', 'auth', 'msgs', 'FileUploader', '$stateParams', UserEditController])
        .controller('UserController', ['$scope', '$http', 'consts', 'auth', 'msgs', 'User', UserController]);

    function UserController($scope, $http, consts, auth, msgs, User) {
        const vm = this;
        vm.user = auth.getUser();
        var apiFinancialIntelligenceBase = consts.apiUrl;

        $('#spinner').toggle();

        $http.get(consts.apiUrl + '/users')
            .then(function (response) {
                vm.user = response.data.result;
            }).catch(function (error) {
            })

    }

    function UserEditController($scope, $state, $http, consts, auth, msgs, FileUploader, $stateParams) {
        const vm = this;
        var apiFinancialIntelligenceBase = consts.apiUrl;

        var id = $stateParams.id;
        vm.id = id;
        vm._role = auth.getUser().role;       

        if (vm.id != 'new') {
            $http.get(consts.apiUrl + '/user/' + id)
                .then(function (response) {
                    vm.user = response.data;
                    vm.user.birthday = new Date(vm.user.birthday);
                }).catch(function (error) {
            })
        }

        vm.changeCEP = function(cep){
            $http.get(consts.apiUrl + '/consultcep/' + cep)
            .then(response =>{
                vm.user.publicPlace = response.data.logradouro;
                vm.user.neighborhood = response.data.bairro;
                vm.user.country = response.data.localidade;
                vm.user.state = response.data.uf;
            }).catch(error =>{
                
            })
        }


        vm.register = function (form) {
            if (vm.id == 'new') {
                    $scope.newUser = {
                        email: '',
                        name: '',
                        password: ''
                    }
                $http.post(consts.apiUrl + '/register/', $scope.newUser)
                    .then(function (response) {
                        msgs.addSuccess("Usuário cadastrado com sucesso!");
                        $state.go("dashboard.home");
                    }).catch(function (error) {
                        msgs.addError(error.data.error.message);                    
                    });
            } else {
                $http.put(consts.apiUrl + '/user/' + id, vm.user)
                    .then(function (response) {
                        msgs.addSuccess("Usuário atualizado com sucesso!");                                                
                        $state.go("dashboard.home");
                    }).catch(function (error) {
                        msgs.addError(error.data.error.message);
                    });
            }
        };

        vm.passwordRecognizer = function (form) {
            if (vm.form.auxPassword !== vm.form.newPassword) {
                msgs.addError('Senhas não conferem!');
            } else {
                $http.put(consts.apiUrl + '/user-password/' + vm.id, form)
                    .then(function (response) {
                        msgs.addSuccess("Senha alterada com sucesso!");
                        $state.go("dashboard.home");
                    }).catch(function (error) {
                        msgs.addError(error.data.error.message);
                    })
            }

        };


    }

})();