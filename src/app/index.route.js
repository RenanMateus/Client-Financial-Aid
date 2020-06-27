(function () {

    angular
        .module('finances')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $stateProvider.state('login', {
                    url: '/login',
                    templateUrl: 'login.html'
                });

                $stateProvider
                    .state('dashboard', {
                        templateUrl: 'template/content.html'
                    })
                $stateProvider
                    .state('dashboard.home', {
                        url: '/home',
                        templateUrl: 'home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    })
                    .state('dashboard.account', {
                        url: '/account',
                        templateUrl: 'account/account.html',
                        controller: 'AccountController',
                        controllerAs: 'vm',
                        params: { page: '1' }
                    })
                    .state('dashboard.accountLaunch', {
                        url: '/accountLaunch',
                        templateUrl: 'accountLaunch/accountLaunch.html',
                        controller: 'AccountLaunchController',
                        controllerAs: 'vm',
                        params: { page: '1', id: 'id' }
                    })
                    .state('dashboard.conciliation', {
                        url: '/conciliation',
                        templateUrl: 'conciliation/conciliation.html',
                        controller: 'ConciliationController',
                        controllerAs: 'vm',
                    })
                    .state('dashboard.flowCalendar', {
                        url: '/flow-calendar',
                        templateUrl: 'flow-calendar/flow-calendar.html',
                        controller: 'FlowCalendarController',
                        controllerAs: 'vm',
                    })
                    .state('dashboard.billsRecipe', {
                        url: '/billsRecipe',
                        templateUrl: 'billsRecipe/billsRecipe.html',
                        controller: 'BillsRecipeController',
                        controllerAs: 'vm',
                        params: { page: '1' }
                    })
                    .state('dashboard.billsExpense', {
                        url: '/billsExpense',
                        templateUrl: 'billsExpense/billsExpense.html',
                        controller: 'BillsExpenseController',
                        controllerAs: 'vm',
                        params: { page: '1' }
                    })
                    .state('dashboard.parceiro', {
                        url: '/partners',
                        templateUrl: 'parceiro/parceiro.html',
                        controller: 'ParceiroController',
                        controllerAs: 'vm',
                        params: { page: '1' }
                    })
                    .state('dashboard.centers', {
                        url: '/centers',
                        templateUrl: 'centers/centers.html',
                        controller: 'CentersController',
                        controllerAs: 'vm',
                        params: { page: '1' }
                    })
                    .state('dashboard.categories', {
                        url: '/categories',
                        templateUrl: 'categories/categories.html',
                        controller: 'CategoriesController',
                        controllerAs: 'vm',
                        params: { page: '1' }
                    })
                    .state('dashboard.user_edit', {
                        url: '/user/:id',
                        templateUrl: 'settings/user/view.html',
                        controller: 'UserEditController',
                        controllerAs: 'vm'
                    })
                    .state('dashboard.user_password', {
                        url: '/user_new_password/:id',
                        templateUrl: 'settings/user/password.html',
                        controller: 'UserEditController',
                        controllerAs: 'vm'
                    })


                $urlRouterProvider.otherwise('/home');
            }
        ])
        .run([
            '$rootScope',
            '$http',
            '$location',
            '$window',
            'auth',
            '$state',
            '$stateParams',
            function ($rootScope, $http, $location, $window, auth, $state, $stateParams) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                validarUser();
                $rootScope.$on('$locationChangeStart', () => validarUser())

                function validarUser() {
                    console.log(auth.getUser());
                    window.scroll(0, 0);

                    const user = auth.getUser();
                    var authPage = '/login';
                    var isAuthPage = $location.url() == authPage ? true : false;
                    console.log(isAuthPage);
                    if (!user && !isAuthPage) {
                        $location.path('/login')
                    } else if (user) {
                        user.isValid = true;
                        $http.defaults.headers.common.Authorization = user.token;
                        isAuthPage ? $location.path('/home') : '';
                    }
                }
            }
        ])

})();