(function () {
    'use strict';

    angular
        .module('finances')
        .controller('FlowCalendarController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$stateParams', '$state', 'msgs', FlowCalendarController]);


    function FlowCalendarController($http, consts, $timeout, $scope, $uibModal, auth, $stateParams, $state, msgs) {
        const vm = this;
        vm.events = [];
        vm.end = new Date();
        vm.start = new Date(vm.end.getFullYear(), vm.end.getMonth() - 1, vm.end.getDate());
        vm.startGraphic = new Date(vm.end.getFullYear(), vm.end.getMonth(), '01');
        vm.endGraphic = new Date(vm.end.getFullYear(), (vm.end.getMonth() + 1), '01');
        $scope.chart = {};
        var range = {
            start: null,
            end: null
        };

        vm.removeElements = function () {
            angular.element('.calendar').fullCalendar('removeEventSource', vm.events);
            vm.events = [];
        };

        $scope.onEventRender = function (event) {
            vm.removeElements();
            let s = new Date(event.start);
            let e = new Date(event.end);
            range.start = new Date((s.getFullYear()) + '/' + (s.getMonth() + 1) + '/' + (s.getDate()));
            range.end = new Date((e.getFullYear()) + '/' + (e.getMonth() + 1) + '/' + (e.getDate()));
            vm.startGraphic = range.start;
            vm.endGraphic = range.end;
            $scope.init();
        };

        $scope.init = function () {
            vm.removeElements();
            $http.get(consts.apiUrl + '/flow', { params: { start: range.start, end: range.end } })
                .then(function (response) {
                    vm.flow = response.data;
                    vm.flow.map(function (item) {
                        vm.events.push({
                            id: item._id,
                            title: (new Date(item.date) <= new Date()) ? 'Saldo Inicial: R$' + item.inicialBalance.toFixed(2) + '\n+ R$' + item.received.toFixed(2) +
                                '\n- R$' + item.payed.toFixed(2) + '\nSaldo Final: R$' + item.finalBalance.toFixed(2) :
                                'Prev. Saldo Inicial: R$' + item.inicialBalance.toFixed(2) + '\n+ R$' + item.received.toFixed(2) +
                                '\n- R$' + item.payed.toFixed(2) + '\nPrev. Saldo Final: R$' + item.finalBalance.toFixed(2),
                            start: new Date(item.date),
                            end: new Date(item.date),
                            description: 'Fluxo de Caixa do Dia',
                            color: (((item.finalBalance >= 0) && new Date(item.date) > new Date()) ? 'rgba(0,0,0,0.1)' : ((item.finalBalance < 0) && (new Date(item.date) < new Date() || ((new Date(item.date) > new Date()) && (item.finalBalance < 0)))) ? 'rgba(255, 0, 0, .4)' : 'rgba(14, 236, 6, 0.4)'),
                            allDay: true,
                            textColor: 'black'
                        });
                    });
                    angular.element('.calendar').fullCalendar('removeEventSource', vm.events);
                    angular.element('.calendar').fullCalendar('addEventSource', vm.events);
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                })

            ////// ROTA DO GRÁFICO /////

            $http.get(consts.apiUrl + '/flow-graphic', { params: { start: vm.startGraphic, end: vm.endGraphic } })
                .then(function (response) {
                    vm.valuesGraphic = response.data;
                    console.log("values", vm.valuesGraphic);
                    let days;
                    let balanceFinal;
                    let balanceInitial;
                    let pay;
                    let recipe;
                    // ########   Gráfico do Fluxo de caixa ###########    
                    if (vm.myChart != undefined) vm.myChart.destroy();

                    var ctx = document.getElementsByClassName("line-chart");
                    vm.myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: days = vm.valuesGraphic.map(element => {
                                element.date = new Date(element.date);
                                return (element.date.getDate() + "/" + (element.date.getMonth() + 1));
                            }),
                            datasets: [
                                {
                                    label: "Saldo Inicial R$",
                                    data: balanceInitial = vm.valuesGraphic.map(element => {
                                        return element.inicialBalance.toFixed(2);
                                    }),
                                    backgroundColor: 'rgba(5, 194, 21, 0.2)',
                                    borderColor: 'rgba(5, 194, 21, 0.7)',
                                    borderWidth: 1,
                                },
                                {
                                    label: "Contas a pagar R$",
                                    data: pay = vm.valuesGraphic.map(element => {
                                        return element.payed.toFixed(2);
                                    }),
                                    backgroundColor: 'rgba(252, 9, 9, 0.2)',
                                    borderColor: 'rgba(252, 9, 9, 0.7)',
                                    borderWidth: 1,
                                },
                                {
                                    label: "Contas a receber R$",
                                    data: recipe = vm.valuesGraphic.map(element => {
                                        return element.received.toFixed(2);
                                    }),
                                    backgroundColor: 'rgba(3, 204, 194, 0.2)',
                                    borderColor: 'rgba(3, 204, 194, 0.7)',
                                    borderWidth: 1,
                                },
                                {
                                    label: "Saldo Final R$",
                                    data: balanceFinal = vm.valuesGraphic.map(element => {
                                        return element.finalBalance.toFixed(2);
                                    }),
                                    backgroundColor: 'rgba(15, 15, 246, 0.2)',
                                    borderColor: 'rgba(15, 15, 246, 0.7)',
                                    borderWidth: 1,
                                }
                            ]
                        },
                        options: {
                            legend: {
                                display: true,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            },
                            maintainAspectRatio: false
                        }
                    });
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: "auto",
                lang: 'pt-br',
                editable: false,
                timezone: 'local',
                ignoreTimezone: true,
                defaultView: 'month',
                monthNames: ['Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro'],
                dayNames: ['Domingo',
                    'Segunda-feira',
                    'Terça-feira',
                    'Quarta-feira',
                    'Quinta-feira',
                    'Sexta-feira',
                    'Sábado'],
                dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sab."],
                header: {
                    left: 'title',
                    center: 'prev, today, next',
                    right: 'month, basicWeek, basicDay',
                },
                buttonText: {
                    today: 'Hoje',
                    prev: 'Página anterior',
                    next: 'Página seguinte',
                    nextYear: 'Um ano depois',
                    prevYear: 'Um ano antes',
                    month: 'Mês',
                    basicDay: 'Dia',
                    agendaWeek: 'Semana'
                },
                titleFormat: {
                    month: 'YYYY MMMM',
                },
                timeFormat: false,
                columnFormat: 'dddd',
                viewRender: $scope.onEventRender,
                allDaySlot: false,
                axisFormat: false,
            }
        };
        angular.element('.calendar').fullCalendar('removeEventSource', vm.events);
        angular.element('.calendar').fullCalendar('addEventSource', vm.events);




    }
})();
