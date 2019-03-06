(function(){
    angular.module('finances')
        .service('uploadFile', function(){
            this.upload = function(file){
                var fd = new FormData();
                fd.append('myfile', file.upload);
                return $http.post('/upload', fd, {
                    transformRequest: angular.indetify,
                    headers:{'Content-Type': undefined }
                })
            }
        })
})();