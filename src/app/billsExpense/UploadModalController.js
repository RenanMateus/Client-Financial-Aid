(function () {
    'use strict';

    angular
        .module('finances')
        .controller('UploadModalController', ['$http', 'consts', 'msgs', 'auth', 'id', '$uibModalInstance', 'FileUploader', UploadModalController]);


    function UploadModalController($http, consts, msgs, auth, id, $uibModalInstance, FileUploader) {
        const vm = this;
        vm.token = auth.getUser().token;
        vm.id = id;

        vm.close = function () {
            $uibModalInstance.dismiss();
        }
        
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
            vm.close();
        };

        console.info('uploader', uploader);
    }
})();

