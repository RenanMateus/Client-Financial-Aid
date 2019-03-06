(function () {
    'use strict';

    angular
        .module('finances')
        .controller('UploadLaunchController', ['$http', 'consts', 'msgs', 'auth', '$uibModalInstance', 'FileUploader', '$stateParams', UploadLaunchController]);


    function UploadLaunchController($http, consts, msgs, auth, $uibModalInstance, FileUploader, $stateParams) {
        const vm = this;
        vm.idAccount = $stateParams.id;
        vm.token = auth.getUser().token;
        
        vm.close = function () {
            $uibModalInstance.dismiss();
        }      

        var uploader = vm.uploader = new FileUploader({
            url: consts.apiUrl + '/import-trasactions/' + vm.idAccount
        });        

        uploader.onWhenAddingFileFailed = function (item, filter, options) {
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
                'Authorization': vm.token                                
            };
            item.alias = "excelFile";
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
            msgs.addSuccess('Transação importada com sucesso');
        };

        console.info('uploader', uploader);

        vm.openExemple = function () {
              window.open(consts.apiUrl + "/exemple/" + auth.getUser()._id + '?token=' + auth.getUser().token);
        }
        vm.download = function () {         
            window.open(consts.apiUrl + "/download/" + auth.getUser()._id + '?token=' + auth.getUser().token, "Modelo");
      }

    }
})();

