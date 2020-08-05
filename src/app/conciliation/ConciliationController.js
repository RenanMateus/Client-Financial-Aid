(function () {
    'use strict';

    angular
        .module('finances')
        .controller('ConciliationController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'auth', '$state', '$stateParams', 'msgs', ConciliationController]);


    function ConciliationController($http, consts, $timeout, $scope, $uibModal, auth, $state, $stateParams, msgs) {
        const vm = this;
        var idBillConciliation = undefined;
        var idLaunchConciliation = undefined;
        vm.bills = undefined;
        vm.trasaction = undefined;
        var page = 1;
        var limit = 10;
        var creditExpense = false;
        var creditRecipe = true;
        var searchTextL = undefined;
        var searchTextB = undefined;
        vm.billRecipe = false;
        vm.billExpense = false;
        vm.credit = false;
        vm.debit = false;

        vm.datehj = new Date();

        vm.endB = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
        vm.endB.setDate(vm.endB.getDate() - 1);
        vm.endB.setHours(23, 59);

        vm.startB = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
        vm.startB.setHours(0);

        vm.endL = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
        vm.endL.setDate(vm.endL.getDate() - 1);
        vm.endL.setHours(23, 59);

        vm.startL = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
        vm.startL.setHours(0);

        // Pegar o mês e ano atual
        if ((new Date().getMonth() + 1) == 1) {
            vm.month = ('Janeiro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 2) {
            vm.month = ('Fevereiro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 3) {
            vm.month = ('Março de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 4) {
            vm.month = ('Abril de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 5) {
            vm.month = ('Maio de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 6) {
            vm.month = ('Junho de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 7) {
            vm.month = ('Julho de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 8) {
            vm.month = ('Agosto de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 9) {
            vm.month = ('Setembro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 10) {
            vm.month = ('Outubro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 11) {
            vm.month = ('Novembro de ' + new Date().getFullYear());
        } else if ((new Date().getMonth() + 1) == 12) {
            vm.month = ('Dezembro de ' + new Date().getFullYear());
        }

        //  ### FUNÇÕES PARA MUDAR AS DATAS DOS LANÇAMENTOS ###

        vm.nextDateL = function () {
            vm.endL = new Date(vm.endL.getFullYear(), (vm.endL.getMonth() + 2), 1);
            vm.endL.setDate(vm.endL.getDate() - 1);
            vm.startL = new Date(vm.startL.getFullYear(), (vm.startL.getMonth() + 1), 1);
            vm.endL.setHours(23);
            vm.endL.setMinutes(59);
            vm.startL.setHours(0);
            vm.startL.setMinutes(0);

            //  PEGA TODOS OS LANÇAMENTOS, SE O CREDITO E DEBITO ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.credit && !vm.debit) || (vm.credit && vm.debit)) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            //  PEGA APENAS OS CRÉDITOS, SE O CRÉDITO ESTIVER MARCADO E DÉBITO DESMARCADO
            if (vm.credit && !vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: vm.credit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            // PEGA APENAS OS DÉBITOS, SE O DÉBITO ESTIVER MARCADO E CRÉDITO DESMARCADO
            if (!vm.credit && vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
        };

        vm.backDateL = function () {
            vm.endL = new Date(vm.endL.getFullYear(), (vm.endL.getMonth()), 1);
            vm.endL.setDate(vm.endL.getDate() - 1);
            vm.startL = new Date(vm.startL.getFullYear(), (vm.startL.getMonth() - 1), 1);
            vm.endL.setHours(23);
            vm.endL.setMinutes(59);
            vm.startL.setHours(0);
            vm.startL.setMinutes(0);

            //  PEGA TODOS OS LANÇAMENTOS, SE O CREDITO E DEBITO ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.credit && !vm.debit) || (vm.credit && vm.debit)) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            //  PEGA APENAS OS CRÉDITOS, SE O CRÉDITO ESTIVER MARCADO E DÉBITO DESMARCADO
            if (vm.credit && !vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: vm.credit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            // PEGA APENAS OS DÉBITOS, SE O DÉBITO ESTIVER MARCADO E CRÉDITO DESMARCADO
            if (!vm.credit && vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
        };

        vm.actuaDateL = function () {
            vm.endL = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
            vm.endL.setDate(vm.endL.getDate() - 1);
            vm.startL = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
            vm.endL.setHours(23);
            vm.endL.setMinutes(59);
            vm.startL.setHours(0);
            vm.startL.setMinutes(0);

            //  PEGA TODOS OS LANÇAMENTOS, SE O CREDITO E DEBITO ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.credit && !vm.debit) || (vm.credit && vm.debit)) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            //  PEGA APENAS OS CRÉDITOS, SE O CRÉDITO ESTIVER MARCADO E DÉBITO DESMARCADO
            if (vm.credit && !vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: vm.credit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            // PEGA APENAS OS DÉBITOS, SE O DÉBITO ESTIVER MARCADO E CRÉDITO DESMARCADO
            if (!vm.credit && vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
        };

        //   ### FUNÇÕES PARA MUDAR AS DATAS DAS CONTAS A PAGAR/RECEBER ######

        vm.nextDateB = function () {
            vm.endB = new Date(vm.endB.getFullYear(), (vm.endB.getMonth() + 2), 1);
            vm.endB.setDate(vm.endB.getDate() - 1);
            vm.startB = new Date(vm.startB.getFullYear(), (vm.startB.getMonth() + 1), 1);
            vm.endB.setHours(23);
            vm.endB.setMinutes(59);
            vm.startB.setHours(0);
            vm.startB.setMinutes(0);

            //  PEGA TODAS AS CONTAS, SE A PAGAR E A RECEBER ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.billRecipe && !vm.billExpense) || (vm.billRecipe && vm.billExpense)) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas!";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas!";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            //  PEGA APENAS AS CONTAS A RECEBER, SE O CONTAS A RECEBER ESTIVER MARCADO E CONTAS A PAGAR DESMARCADO
            if (vm.billRecipe && !vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: vm.billRecipe, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            // PEGA APENAS AS CONTAS A PAGAR, SE O CONTAS A PAGAR ESTIVER MARCADO E CONTAS A RECEBER DESMARCADO
            if (!vm.billRecipe && vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
        };

        vm.backDateB = function () {
            vm.endB = new Date(vm.endB.getFullYear(), (vm.endB.getMonth()), 1);
            vm.endB.setDate(vm.endB.getDate() - 1);
            vm.startB = new Date(vm.startB.getFullYear(), (vm.startB.getMonth() - 1), 1);
            vm.endB.setHours(23);
            vm.endB.setMinutes(59);
            vm.startB.setHours(0);
            vm.startB.setMinutes(0);

            //  PEGA TODAS AS CONTAS, SE A PAGAR E A RECEBER ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.billRecipe && !vm.billExpense) || (vm.billRecipe && vm.billExpense)) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas!";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas!";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            //  PEGA APENAS AS CONTAS A RECEBER, SE O CONTAS A RECEBER ESTIVER MARCADO E CONTAS A PAGAR DESMARCADO
            if (vm.billRecipe && !vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: vm.billRecipe, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            // PEGA APENAS AS CONTAS A PAGAR, SE O CONTAS A PAGAR ESTIVER MARCADO E CONTAS A RECEBER DESMARCADO
            if (!vm.billRecipe && vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
        };

        vm.actuaDateB = function () {
            vm.endB = new Date(vm.datehj.getFullYear(), (vm.datehj.getMonth() + 1), 1);
            vm.endB.setDate(vm.endB.getDate() - 1);
            vm.startB = new Date(vm.datehj.getFullYear(), vm.datehj.getMonth(), 1);
            vm.endB.setHours(23);
            vm.endB.setMinutes(59);
            vm.startB.setHours(0);
            vm.startB.setMinutes(0);

            //  PEGA TODAS AS CONTAS, SE A PAGAR E A RECEBER ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.billRecipe && !vm.billExpense) || (vm.billRecipe && vm.billExpense)) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas!";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas!";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            //  PEGA APENAS AS CONTAS A RECEBER, SE O CONTAS A RECEBER ESTIVER MARCADO E CONTAS A PAGAR DESMARCADO
            if (vm.billRecipe && !vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: vm.billRecipe, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            // PEGA APENAS AS CONTAS A PAGAR, SE O CONTAS A PAGAR ESTIVER MARCADO E CONTAS A RECEBER DESMARCADO
            if (!vm.billRecipe && vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas entre essas datas";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
        };



        $scope.init = function () {
            vm.endB.setHours(23);
            vm.endB.setMinutes(59);
            vm.startB.setHours(0);
            vm.startB.setMinutes(0);

            vm.endL.setHours(23);
            vm.endL.setMinutes(59);
            vm.startL.setHours(0);
            vm.startL.setMinutes(0);

            if (!vm.billRecipe && !vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro == "Não há Contas entre essas datas!";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError('Erro interno do servidor, por favor, contate o suporte.');
                        vm.textErro = "Não há Contas!";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }

            if (!vm.credit && !vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações entre essas datas!";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError('Erro interno do servidor, por favor, contate o suporte.');
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
        };

        $scope.init();

        vm.searchL = function (searchTextL) {
            vm.endL.setHours(23);
            vm.endL.setMinutes(59);
            vm.startL.setHours(0);
            vm.startL.setMinutes(0);

            //  PEGA TODOS OS LANÇAMENTOS, SE O CREDITO E DEBITO ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.credit && !vm.debit) || (vm.credit && vm.debit)) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações com essa descrição";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            //  PEGA APENAS OS CRÉDITOS, SE O CRÉDITO ESTIVER MARCADO E DÉBITO DESMARCADO
            if (vm.credit && !vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: vm.credit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações com essa descrição";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }
            // PEGA APENAS OS DÉBITOS, SE O DÉBITO ESTIVER MARCADO E CRÉDITO DESMARCADO
            if (!vm.credit && vm.debit) {
                $scope.assyncRequest1 = false;
                $scope.visibleTableT = false;
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                        if (vm.totalItemsT == 0) {
                            vm.notifyErro1 = "Não há Transações com essa descrição";
                            $scope.visibleTableT = true;
                        };
                        $scope.assyncRequest1 = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro1 = "Não há Transações!";
                        $scope.assyncRequest1 = true;
                        $scope.visibleTableT = true;
                    });
            }

        }

        //  PESQUISAS DE CONTAS
        vm.searchB = function (searchTextB) {
            vm.endB.setHours(23);
            vm.endB.setMinutes(59);
            vm.startB.setHours(0);
            vm.startB.setMinutes(0);

            //  PEGA TODAS AS CONTAS, SE A PAGAR E A RECEBER ESTÃO MARCADOS OU DESMARCADOS
            if ((!vm.billRecipe && !vm.billExpense) || (vm.billRecipe && vm.billExpense)) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas com essa descrição";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas!";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            //  PEGA APENAS AS CONTAS A RECEBER, SE O CONTAS A RECEBER ESTIVER MARCADO E CONTAS A PAGAR DESMARCADO
            if (vm.billRecipe && !vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: vm.billRecipe, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas com essa descrição";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }
            // PEGA APENAS AS CONTAS A PAGAR, SE O CONTAS A PAGAR ESTIVER MARCADO E CONTAS A RECEBER DESMARCADO
            if (!vm.billRecipe && vm.billExpense) {
                $scope.assyncRequest = false;
                $scope.visibleTable = false;
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                        if (vm.totalItemsB == 0) {
                            vm.notifyErro = "Não há Contas com essa descrição";
                            $scope.visibleTable = true;
                        };
                        $scope.assyncRequest = true;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                        vm.textErro = "Não há Contas com essa descrição";
                        $scope.assyncRequest = true;
                        $scope.visibleTable = true;
                    });
            }

        }
        vm.bill = function (conta) {
            vm.bills = conta;
            console.log("conta selecionada", vm.bills);
        }
        vm.launch = function (transacao) {
            vm.trasaction = transacao;
            console.log("lançamento selecionado", vm.trasaction);
        }

        vm.nextListTransaction = function (currentPageT) {
            page = currentPageT;

            vm.endL.setHours(23);
            vm.endL.setMinutes(59);
            vm.startL.setHours(0);
            vm.startL.setMinutes(0);

            if ((!vm.credit && !vm.debit) || (vm.credit && vm.debit)) {
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    });
            }
            //  PEGA APENAS OS CRÉDITOS, SE O CRÉDITO ESTIVER MARCADO E DÉBITO DESMARCADO
            if (vm.credit && !vm.debit) {
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: vm.credit, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    });
            }
            // PEGA APENAS OS DÉBITOS, SE O DÉBITO ESTIVER MARCADO E CRÉDITO DESMARCADO
            if (!vm.credit && vm.debit) {
                $http.get(consts.apiUrl + '/posting-search/' + page, { params: { text: searchTextL, start: vm.startL, end: vm.endL, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.accountLaunch = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsT = response.data.total;
                        vm.itemsPerPageT = 10;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    });
            }
        }

        vm.nextListBills = function (currentPageB) {
            page = currentPageB;

            vm.endB.setHours(23);
            vm.endB.setMinutes(59);
            vm.startB.setHours(0);
            vm.startB.setMinutes(0);

            if ((!vm.billRecipe && !vm.billExpense) || (vm.billRecipe && vm.billExpense)) {
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    });
            }
            //  PEGA APENAS AS CONTAS A RECEBER, SE O CONTAS A RECEBER ESTIVER MARCADO E CONTAS A PAGAR DESMARCADO
            if (vm.billRecipe && !vm.billExpense) {
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: vm.billRecipe, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    });
            }
            // PEGA APENAS AS CONTAS A PAGAR, SE O CONTAS A PAGAR ESTIVER MARCADO E CONTAS A RECEBER DESMARCADO
            if (!vm.billRecipe && vm.billExpense) {
                $http.get(consts.apiUrl + '/bill-search/' + page, { params: { text: searchTextB, start: vm.startB, end: vm.endB, limit: limit, credit: false, conciliation: true } })
                    .then(function (response) {
                        $scope.bills = response.data.result;
                        vm.pages = response.data.pages;
                        vm.totalItemsB = response.data.total;
                        vm.itemsPerPageB = 10;
                    }).catch(function (error) {
                        msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                    });
            }
        }


        vm.payBill = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'conciliation/payBill.html',
                controller: 'PayBillController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: 'static',
                backdropClass: 'fade',
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                vm.searchB(searchTextB);
                $scope.init();
            }, function () {
                setTimeout(function () {
                    vm.searchB(searchTextB);
                }, 300);
            });
        };
        vm.recipeBill = function (id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'conciliation/recipeBill.html',
                controller: 'RecipeBillController',
                controllerAs: 'vm',
                windowClass: '',
                backdrop: 'static',
                backdropClass: 'fade',
                size: 'lg',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (result) {
                vm.searchB(searchTextB);
                $scope.init();
            }, function () {
                setTimeout(function () {
                    vm.searchB(searchTextB);
                }, 300);
            });
        };

        vm.conciliation = function () {
            if (vm.bills.ok) {
                if (vm.bills.credit === vm.trasaction.credit) {
                    if (vm.bills.total === vm.trasaction.value) {
                        idBillConciliation = vm.bills._id;
                        idLaunchConciliation = vm.trasaction._id;
                        $http.post(consts.apiUrl + '/conciliation', { _transaction: idLaunchConciliation, _bill: idBillConciliation })
                            .then(function (response) {
                                msgs.addSuccess("Conciliação realizada com sucesso!");
                                vm.searchB(searchTextB);
                                vm.searchL(searchTextL);

                                $scope.accountLaunch.value = parseFloat($scope.accountLaunch.value);
                                if (vm.bills._category)
                                    vm.trasaction._category = vm.bills._category;
                                if (vm.bills._partner)
                                    vm.trasaction._partner = vm.bills._partner;
                                if (vm.bills._center)
                                    vm.trasaction._center = vm.bills._center;

                                if (vm.trasaction._category && !vm.bills._category)
                                    vm.bills._category = vm.trasaction._category;
                                if (vm.trasaction._partner && !vm.bills._partner)
                                    vm.bills._partner = vm.trasaction._partner;
                                if (vm.trasaction._center && !vm.bills._center)
                                    vm.bills._center = vm.trasaction._center;

                                setTimeout(() => {
                                    $http.put(consts.apiUrl + '/bill/' + vm.bills._id, vm.bills)
                                        .then(function (response) {
                                            $uibModalInstance.dismiss();

                                            $http.put(consts.apiUrl + '/posting/' + vm.trasaction._account._id + '/' + vm.trasaction._id, vm.trasaction)
                                                .then(function (response) {
                                                    $uibModalInstance.dismiss();
                                                }).catch(function (error) {
                                                });

                                        }).catch(function (error) {
                                        });
                                }, 1500);

                            }).catch(function (error) {
                                msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                            });
                    } else { msgs.addError("Valor da transação diferente do valor da conta"); }
                } else { msgs.addError("Tipo de conta diferente do tipo de transação"); }
            } else { msgs.addError("Conta não paga ou não recebida"); }
        }

        $scope.open = function (id) {
            $state.go("dashboard.billsRecipe", { newtab: true });
            $scope.openEditRecipe = function (id) {
                var modalInstance = $uibModal.open({
                    templateUrl: '../billsRecipe/billsRecipeEdit.html',
                    controller: 'BillsRecipeModalController',
                    controllerAs: 'vm',
                    windowClass: '',
                    backdrop: 'static',
                    backdropClass: 'fade',
                    size: 'lg',
                    resolve: {
                        id: function () {
                            return id;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                }, function () {
                    setTimeout(function () {
                        $scope.init();
                    }, 300);
                });
            };
            $scope.openEditRecipe(id)
        }
    }
})();
