(function(){
    angular.module('finances').component('contentHeader', {
        bindings:{
            title:'@',
            small1:'@',
            small2:'@',
            small3:'@',
            route1:'@',
            route2:'@',
            route3:'@'
        },
        template:`
        <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-lg-10">
            <br>
            <ol class="breadcrumb">
                <li ui-sref-active="active">
                    <a ui-sref="{{$ctrl.route1}}">{{$ctrl.small1}}</a>
                </li>
                <li ui-sref-active="active">
                    <a ui-sref="{{$ctrl.route2}}">{{$ctrl.small2}}</a>
                </li>
                <li ui-sref-active="active" ng-if='$ctrl.small3'>
                    <a ui-sref="{{$ctrl.route3}}">{{$ctrl.small3}}</a>
                </li>
            </ol>
        </div>
        <div class="col-lg-2">
    
        </div>
    </div>
        `
    });

})();
