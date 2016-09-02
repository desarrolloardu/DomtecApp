angular.module('starter.directives', [])

.directive('range', function () {
    return {
        restrict: 'C',
       
        link: function (scope, element, attr) {
            element.bind('touchstart mousedown', function(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            });
        }
    };
 })
 
 .directive('dispositivosDirective',[ function () {
    return {
        restrict: 'E',
         scope:{
          idEspacio:'=?'  
            
        },
        templateUrl:'./templates/dispositivos-directive.html',
        link: function (scope, element, attr) {
            
        },
        controllerAs:'di',
        controller: 'DispositivosCtrl'



    };
 }])
 
 
  .directive('espaciosDirective',[ function () {
    return {
        restrict: 'E',
        templateUrl:'./templates/espacios-directive.html',
        link: function (scope, element, attr) {
            
        },
        controllerAs:'es',
        controller: 'EspaciosCtrl'



    };
 }])

