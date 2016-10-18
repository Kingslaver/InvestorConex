'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:ModalcontrollerCtrl
 * @description
 * # ModalcontrollerCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('ModalController', function ($scope,close,phoneNumber) {
    // when you need to close the modal, call close
  $scope.phoneNumber=phoneNumber;
  
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});
