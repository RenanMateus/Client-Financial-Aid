(function() {
    angular.module('finances', [
        'ui.router',
        'ngAnimate',
        'toastr',
        'ui.bootstrap',
        'ngResource',
        'datatables',
        'datatables.buttons',
        'ui.select', //multi-select in action
        'angularFileUpload',
        'chart.js',
        'ngMask',
        'ui.calendar',
        'cuppaDatepickerDirective',
        'webcam'     
    ]) .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
          chartColors: ['#5454e8'],
          responsive: true
        });
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
          showLines: true
        });
      }])
})();