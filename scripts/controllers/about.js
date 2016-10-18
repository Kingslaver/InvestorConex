'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
