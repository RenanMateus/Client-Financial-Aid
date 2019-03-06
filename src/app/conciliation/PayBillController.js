(function () {
    'use strict';

    angular
        .module('finances')
        .controller('PayBillController', ['$http', 'consts', '$timeout', '$scope', '$uibModal', 'id', 'msgs', '$uibModalInstance', 'auth', 'FileUploader', PayBillController]);


    function PayBillController($http, consts, $timeout, $scope, $uibModal, id, msgs, $uibModalInstance, auth, FileUploader) {
        const vm = this;
        $scope.billsExpense = {};
        vm.anexo = false;
        let token = auth.getUser().token;
        vm.id = id;

        if (id != 'new') {
            $http.get(consts.apiUrl + '/bill/' + id)
                .then(function (response) {
                    $scope.billsExpense = response.data;
                    $scope.billsExpense.total = $scope.billsExpense.value;
                    $scope.billsExpense.payday = new Date();
                }).catch(function (error) {
                    msgs.addError("Erro interno do servidor, por favor, contate o suporte.");
                });
        }

        vm.close = function() {
            $uibModalInstance.dismiss();
        }
        $scope.anexo = function() {
           vm.anexo = (!vm.anexo);
        }

        $scope.register = function (form) {
            $scope.billsExpense.total = parseFloat($scope.billsExpense.total);
            $scope.billsExpense.ok = true;
                $http.put(consts.apiUrl + '/bill/' + id, $scope.billsExpense)
                    .then(function (response) {
                        msgs.addSuccess("Conta Paga com sucesso!");
                        $uibModalInstance.dismiss();
                    }).catch(function (error) {
                        msgs.addError("Erro ao pagar conta");
                    });
            }  
            
            // upload

            vm.listAll = function () {
                try {
                    $http.get(consts.apiUrl + "/file-bill/" + vm.id)
                        .then(function (result) {
                            vm.anexos = result.data;
                        }).catch(function (err) {
                        })
                } catch (error) {
                }
            };
    
            vm.listAll();
            var uploader = vm.uploader = new FileUploader({
                url: consts.apiUrl + ('/file-bill/' + vm.id)
            });
    
            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                console.info('onAfterAddingFile', fileItem);
    
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
    
            };
            uploader.onBeforeUploadItem = function (item) {
                item.method = 'POST';
                item.headers = {
                    'Authorization': token
                };
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function (progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
                fileItem.remove();
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function () {
                console.info('onCompleteAll');
                msgs.addSuccess('Arquivo anexado com sucesso!');
            };
    
            console.info('uploader', uploader);
    }
})();