'use strict';

angular.module('afwebappApp')
.controller('folioAccordion', ['$scope', function ($scope) {
    $scope.clicked = function($event) {
        var folioAccordionTitle = jQuery($event.target);
        var folioAccordionContent = folioAccordionTitle.next();
        folioAccordionContent.slideToggle();
        folioAccordionTitle.toggleClass('folioAccordionSelected');
    };
    
}]);