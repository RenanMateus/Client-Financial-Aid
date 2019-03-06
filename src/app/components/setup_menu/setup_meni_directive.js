(function () {
    'use strict';

    angular
            .module('finances')
            .directive('setupMenu', setupMenu);

    /** @ngInject */
    function setupMenu() {


        var directive = {
            restrict: 'E',
            templateUrl: 'components/setup_menu/setup_menu.html',
            scope: {
                visible: '='
            },
            controller: SetupMenu,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function SetupMenu() {

            
            /*
            $scope.$state = $state;
            $scope.currentUser = Auth.getCurrentUser();
            $scope.isPermitted = Auth.isPermitted;
            console.log($scope.currentUser);
            var u = User.get();
            u.$promise.then(function(response){
            $scope.profession = response.role.alias;
            console.log(response);
            });

            $scope.isActive = function (route) {
                return route === $location.path();
            };*/
        }
    }

})();
