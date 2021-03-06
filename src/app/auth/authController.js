(function () {
    angular
        .module('finances')
        .controller('AuthController', [
            '$http',
            'auth',
            'toastr',
            '$scope',
            '$state',
            'consts',
            AuthController
        ]);

    function AuthController($http, auth, toastr, $scope, $state, consts) {

        var page = 1;
        var limit = 10;
        const vm = this;
        $scope.$state = $state;
        vm.apiUrl = consts.apiUrl;
        vm.$state = $state;
        $scope.notify = [];
        vm.loginMode = true;
        vm.changeMode = () => {
            vm.loginMode = !vm.loginMode;
            console.log(vm.loginMode);
        }

        vm.getUser = () => auth.getUser();
        vm.logout = () => {
            auth.logout();
            window.location.reload();
        }



        vm.login = (user) => {
            auth.login(user);
        }
        vm.signup = (user) => {
            auth.signup(user);
        }

        vm.user = vm.getUser();

        vm.pageSign = 'login';


        vm.isAdmin = () => Profile.isAdmin();
        vm.isClient = () => Profile.isClient();
        vm.isAudit = () => Profile.isAudit();
        // console.log(vm.isAdmin());

        $http.get(consts.apiUrl + '/accounts/' + page, { params: { limit } })
            .then(function (response) {
                $scope.account = response.data.result;
                vm.pages = response.data.pages;
                vm.totalItems = response.data.total;
                vm.itemsPerPage = 10;
            }).catch(function (error) {
            });
        vm.user = auth.getUser();

        vm.toggleNavigation = function (e) {
            //e.preventDefault();
            $("body").toggleClass("mini-navbar")
            vm.smoothlyMenu();
        }
        vm.smoothlyMenu = function () {
            if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                // Hide menu in order to smoothly turn on when maximize menu
                $('#side-menu').hide();
                // For smoothly turn on menu
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(400);
                    }, 200);
            } else if ($('body').hasClass('fixed-sidebar')) {
                $('#side-menu').hide();
                setTimeout(
                    function () {
                        $('#side-menu').fadeIn(400);
                    }, 100);
            } else {
                // Remove all inline style from jquery fadeIn function to reset menu state
                $('#side-menu').removeAttr('style');
            }
        }
    }
})();