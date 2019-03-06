(function(){
    angular.module('finances')
        .directive('fileModel', 
        [
            '$parser',
            function($parser){
                return {
                    restrict:'A',
                    link: function(scope, element, attrs){
                        var parsedFile = $parser(attrs.fileModel);
                        var parsedFileSetter = parsedFile.assing;
                        element.bind('change', function(){
                            scope.$apply(function(){
                                parsedFileSetter(scope, element[0].files[0]);
                            })
                        })
                    }
                }
            }
        ])
})();