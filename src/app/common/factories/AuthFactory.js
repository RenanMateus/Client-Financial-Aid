(function(){
    angular.module('finances').factory('auth',[
        '$http',
        'consts',
        'msgs',
        '$location',
        '$rootScope',
        '$window',
        '$state',
        AuthFactory
    ]);
    function AuthFactory($http, consts, msgs, $location, $rootScope, $window, $state){

        let user = null;

        function getUser(){
            if(!user)
                user = JSON.parse(localStorage.getItem(consts.userKey));
            return user;
        }

        function signup(user, callback){
            submit('signup', user, callback);
        }
        function login(user, callback){
            submit('login', user, callback);
        }
        function submit(url, user, callback){
            let text = url.toUpperCase();
            $http.post(`${consts.apiUrl}/${url}`, user)
                .then( resp =>{
                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data));
                    console.log(resp.data);
                    $http.defaults.headers.common.Authorization = resp.data.token;                                        
                    window.location.reload(true);
                   // msgs.addSuccess(`Seja bem-vindo, ${resp.data.name}`);
                    if(url == 'signup'){
                        $location.path('/');
                    }
                }).catch( resp =>{
                    msgs.addError(resp.data.error.message || 'Serviço indisponível no momento, entre em contato com o suporte!');
                })
        }
        function logout(callback){
            localStorage.removeItem(consts.userKey);
            $http.defaults.headers.common.Authorization = '';
            msgs.addInfo("Usuário deslogado com sucesso!");
            if(callback) callback(null);
        }
        return { signup, login, logout, getUser }
    }
})();