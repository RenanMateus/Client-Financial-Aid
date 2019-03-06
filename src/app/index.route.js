(function() {

    angular
        .module('finances')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
                $stateProvider.state('login', {
                    url:'/login',
                    templateUrl:'login.html'
                });
                
                $stateProvider
                .state('dashboard', {
                    templateUrl: 'template/content.html'
                })
                $stateProvider
                .state('dashboard.settings', {
                    url: '/settings',
                    templateUrl: 'settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs:'vm'
                })
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
                    params:{page:'1'}
                })               
                .state('dashboard.accountLaunch', {
                    url: '/accountLaunch',
                    templateUrl: 'accountLaunch/accountLaunch.html',
                    controller: 'AccountLaunchController',
                    controllerAs: 'vm',
                    params:{page:'1', id:'id'}
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
                    params:{page:'1'}
                })
                .state('dashboard.billsExpense', {
                    url: '/billsExpense',
                    templateUrl: 'billsExpense/billsExpense.html',
                    controller: 'BillsExpenseController',
                    controllerAs: 'vm',
                    params:{page:'1'}
                })
                .state('dashboard.parceiro', {
                    url: '/partners',
                    templateUrl: 'parceiro/parceiro.html',
                    controller: 'ParceiroController',
                    controllerAs: 'vm',
                    params: {page: '1'}
                })
                .state('dashboard.centers', {
                    url: '/centers',
                    templateUrl: 'centers/centers.html',
                    controller: 'CentersController',
                    controllerAs: 'vm',
                    params: {page: '1'}
                })
                .state('dashboard.categories', {
                    url: '/categories',
                    templateUrl: 'categories/categories.html',
                    controller: 'CategoriesController',
                    controllerAs: 'vm',
                    params: {page: '1'}
                })
                .state('dashboard.diary', {
                    url: '/diary',
                    templateUrl: 'diary/diary.html',
                    controller: 'DiaryController',
                    controllerAs: 'vm'
                })
                
              
                //Settings routes
                .state('dashboard.user', {
                    url: '/users',
                    templateUrl: 'settings/user/list.html',
                    controller: 'UserController',
                    controllerAs: 'vm'
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
                .state('dashboard.fixedExpenseCard', {
                    url: '/fixed-expense-card/:page?',
                    templateUrl: 'fixedExpenseCard/fixedExpenseCard.html',
                    controller: 'FixedExpenseCardController',
                    controllerAs: 'vm',
                    params: {page:'1'}
                })
                .state('dashboard.cardExpense', {
                    url: '/card-expense/:page?',
                    templateUrl: 'cardExpense/cardExpense.html',
                    controller: 'CardExpenseController',
                    controllerAs: 'vm',
                    params: {page:'1'}
                })
                .state('dashboard.creditCard', {
                    url: '/credit-card/:page',
                    templateUrl: 'creditCard/creditCard.html',
                    controller: 'CreditCardController',
                    controllerAs: 'vm',
                    params: {page:'1'}
                })
                .state('dashboard.expense', {
                    url: '/expense/:page?',
                    templateUrl: 'expense/expense.html',
                    controller: 'ExpenseController',
                    controllerAs: 'vm',
                    params: {page:'1'}
                })
                .state('dashboard.categorieExpense', {
                    url: '/categorie-expense/:page?',
                    templateUrl: 'categorieExpense/categorieExpense.html',
                    controller: 'CategorieExpenseController',
                    controllerAs: 'vm',
                    params:{page:'1'}
                })
                .state('dashboard.categorieRecipe', {
                    url: '/categorie-recipe/:page?',
                    templateUrl: 'categorieRecipe/categorieRecipe.html',
                    controller: 'CategorieRecipeController',
                    controllerAs: 'vm',
                    params:{page:'1'}
                })
                .state('dashboard.recipe', {
                    url: '/recipe/:page?',
                    templateUrl: 'recipe/recipe.html',
                    controller: 'RecipeController',
                    controllerAs: 'vm',
                    params:{page:'1'}
                })
                .state('dashboard.tag', {
                    url: '/tag/:page?',
                    templateUrl: 'tags/tags.html',
                    controller: 'TagsController',
                    controllerAs: 'vm',
                    params: {page:'1'}
                })
                .state('dashboard.general', {
                    url: '/general',
                    templateUrl: 'settings/general_info/general.html',
                    controller: 'GeneralController',
                    controllerAs: 'vm'
                })
                .state('dashboard.first_access_general_info', {
                    url: '/first_access',
                    templateUrl: 'settings/general_info/first_access.html',
                    controller: 'FirstAccessGeneralInfoController',
                    controllerAs: 'vm'
                })
                .state('dashboard.profile', {
                    url: '/profile',
                    templateUrl: 'settings/users_profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                })
                .state('dashboard.attendance_type', {
                    url: '/attendance_type',
                    templateUrl: 'settings/attendance_type/attendance.list.html',
                    controller: 'AttendanceTypeController',
                    controllerAs: 'vm'
                })
                .state('dashboard.calendar', {
                    url: '/calendar',
                    templateUrl: 'settings/calendar/calendar.html',
                    controller: 'CalendarController',
                    controllerAs: 'vm'
                })
                .state('dashboard.insurance_company', {
                    url: '/insurance',
                    templateUrl: 'settings/insurance_company/insurance.list.html',
                    controller: 'InsuranceController',
                    controllerAs: 'vm'
                })
                .state('dashboard.specialty_type', {
                    url: '/specialty',
                    templateUrl: 'settings/specialty_type/specialty.list.html',
                    controller: 'SpecialtyTypeController',
                    controllerAs: 'vm'
                })
                .state('dashboard.procedure_type', {
                    url: '/procedure',
                    templateUrl: 'settings/procedure_type/procedure.list.html',
                    controller: 'ProcedureTypeController',
                    controllerAs: 'vm'
                })
                //Doc's models
                .state('dashboard.certificate_model', {
                    url: '/certicate_model',
                    templateUrl: 'settings/certificate_model/certificate.list.html',
                    controller: 'CertificateModelController',
                    controllerAs: 'vm'
                })
                .state('dashboard.prescription_model', {
                    url: '/prescription_model',
                    templateUrl: 'settings/prescription_model/prescription.list.html',
                    controller: 'PrescriptionModelController',
                    controllerAs: 'vm'
                })
                .state('dashboard.report', {
                    url: '/report',
                    templateUrl: 'settings/report/report.html',
                    controller: '',
                    controllerAs: 'vm'
                })
                .state('dashboard.records', {
                    url: '/records',
                    templateUrl: 'settings/records_model/records.html',
                    controller: 'RecordsController',
                    controllerAs: 'vm'
                })
                .state('dashboard.first_records', {
                    url: '/first_records',
                    templateUrl: 'settings/records_model/first.records.html',
                    controller: 'FirstRecordsController',
                    controllerAs: 'vm'
                })
                .state('dashboard.exam_model', {
                    url: '/exam_model',
                    templateUrl: 'settings/exam_model/exam.list.html',
                    controller: 'ExamModelController',
                    controllerAs: 'vm'
                })
                .state('dashboard.attendance_recep', {
                    url: '/attendance_recep',
                    templateUrl: 'attendance_recep/attendance.html',
                    controller: 'AttendanceRecepController',
                    controllerAs: 'vm'
                })
                    
                    $urlRouterProvider.otherwise('/home');
                    // $locationProvider.hashPrefix('');
                    // $locationProvider.html5Mode(true);              
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
            function($rootScope, $http, $location, $window, auth, $state, $stateParams) {
                
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
                    if(!user && !isAuthPage){
                        $location.path('/login')
                    }else if(user){
                      user.isValid = true;
                      $http.defaults.headers.common.Authorization = user.token;
                      isAuthPage ? $location.path('/home') : '';
                    }
                    // if (!user && !isAuthPage) {
                    //     $window.location.href = authPage;
                    // } else if (user) {
                    //     user.isValid = true;
                    //     $http.defaults.headers.common.Authorization = user.token;
                    //     isAuthPage ? $window.location.href = "/rinaacc/": ""
                    // }

                }
            }
        ])

})();