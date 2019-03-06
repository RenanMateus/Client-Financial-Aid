(function(){
    angular.module('finances').factory('Profile',[
        'toastr',
        'auth',
        ProfileFactory
    ]);
    function ProfileFactory(toastr, auth){
        
        function getRole(){
            if(!JSON.parse(localStorage.getItem('role'))){
                role = () => auth.getUser().role;
                localStorage.setItem('role', JSON.stringify(role));
            }
            console.log(role)
            return role;
        }


        function setRole(role){
                this.role = role;
        }

        function isAdmin() {
            return (auth.getUser().role =='ADM' || auth.getUser().role =='GER')
            
        }
        function isClient(){
            return (auth.getUser().role =='CLT')
            
        }
        function isAudit(){
            return (auth.getUser().role =='MNT' || auth.getUser().role =='OPR')
            
        }

        return { isAdmin, isClient, isAudit }
    }
})();