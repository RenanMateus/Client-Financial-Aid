angular.module('finances').constant('consts', {
    appName:'Financial Aid',
    version:'1.0',
    owner:'Renan Softwares',
    year:'2018 - 2019',
    site:'#',
    //apiUrl:'http://financial-aid.me:3701/api/v1',
    apiUrl:'http://localhost:3000/api/v1',
    userKey:'eclinic_token'
    
}).run(['$rootScope', 'consts', function($rootScope, consts){
    $rootScope.consts = consts;
}]);