(function () {
    'use strict';

    angular
        .module('finances')
        .controller('HomeController', ['$http', 'consts', '$timeout', '$state', '$scope', '$stateParams', 'msgs', HomeController]);


    function HomeController($http, consts, $timeout, $scope, $stateParams, msgs) {
        const vm = this;
        vm.end = new Date();
        vm.start = new Date(vm.end.getFullYear(), vm.end.getMonth() - 1, vm.end.getDate());
        vm.startGraphic = new Date(vm.end.getFullYear(), vm.end.getMonth(), '01');
        vm.endGraphic = new Date(vm.end.getFullYear(), (vm.end.getMonth() + 1), '01');
        $scope.chart = {};

        // Pegar o mês atual
        if ( (new Date().getMonth() + 1) == 1 ) {
            vm.month = '(Janeiro)';
        } else if ((new Date().getMonth() + 1) == 2 ){
            vm.month = '(Fevereiro)';
        } else if ((new Date().getMonth() + 1) == 3 ){
            vm.month = '(Março)';
        } else if ((new Date().getMonth() + 1) == 4 ){
            vm.month = '(Abril)';
        } else if ((new Date().getMonth() + 1) == 5 ){
            vm.month = '(Maio)';
        } else if ((new Date().getMonth() + 1) == 6 ){
            vm.month = '(Junho)';
        } else if ((new Date().getMonth() + 1) == 7 ){
            vm.month = '(Julho)';
        } else if ((new Date().getMonth() + 1) == 8 ){
            vm.month = '(Agosto)';
        } else if ((new Date().getMonth() + 1) == 9 ){
            vm.month = '(Setembro)';
        } else if ((new Date().getMonth() + 1) == 10 ){
            vm.month = '(Outubro)';
        } else if ((new Date().getMonth() + 1) == 11 ){
            vm.month = '(Novembro)';
        } else if ((new Date().getMonth() + 1) == 12 ){
            vm.month = '(Dezembro)';
        }

        $scope.init = function () {
            $http.get(consts.apiUrl + '/dashboard')
                .then(function (response) {
                    vm.values = response.data;                
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        };
        $scope.init();

        $http.get(consts.apiUrl + '/flow-graphic', { params: { start: vm.startGraphic, end: vm.endGraphic } })
        .then(function (response) {
            vm.valuesGraphic = response.data;               
            let days;
            let balanceFinal;
            let balanceInitial;
            let pay;
            let recipe;
   // ########   Gráfico do dashboard ########### 

            var ctx = document.getElementsByClassName("line-chart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {                            
                    labels: days = vm.valuesGraphic.map( element => {
                       element.date = new Date(element.date);
                        return (element.date.getDate() + "/" + (element.date.getMonth() + 1));
                    }),
                    datasets: [
                        {
                        label: "Saldo R$",
                        data:balanceFinal = vm.valuesGraphic.map (element => {
                            return element.finalBalance.toFixed(2);
                        }),
                        backgroundColor:'rgba(15, 15, 246, 0.2)',                                                                    
                        borderColor:'rgba(15, 15, 246, 0.7)',
                        borderWidth: 1,
                    }
                ]
                },
                options: {
                   title:{
                       display:true,
                       fontSize: 28,
                       text: ("Fluxo de Caixa do Mês Corrente " + vm.month)
                   },
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero: true
                           }
                       }]
                   }
                }
            });

        }).catch(function (error) {
            msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
        });





    }
})();
