(function(){
    angular.module('finances').factory('msgs',[
        'toastr',
        MsgsFactory
    ]);
    function MsgsFactory(toastr){
        
        function addMsg(msgs, title, method){
                toastr[method](msgs, title);
        }

        function addSuccess(msgs){
            addMsg(msgs, 'Sucesso', 'success');
        }

        function addError(msgs){
            addMsg(msgs, 'Erro', 'error');
        }
        function addInfo(msgs){
            addMsg(msgs, '', 'info');
        }

        return { addSuccess, addError, addInfo }
    }
})();