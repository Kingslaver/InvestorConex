'use strict';

/**
* @ngdoc function
* @name afwebappApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the afwebappApp
*/
angular.module('afwebappApp')
  .controller('LoginCtrl', function ($scope, $http, $state, $rootScope, $window, $location, CommonUrlFactory, UserFactory) {
      //alert('login controller');

      $scope.userdata = {};
      $rootScope.loggedInUser = {};
      $rootScope.currentPath = $location.path();
      var urlBase = CommonUrlFactory.getUserServiceUrl();
      var loginUrl = CommonUrlFactory.getLoginServiceUrl();
      $rootScope.hideMenu = true;

      $scope.login = function () {
          $window.location.href = loginUrl;
      };
      $scope.logout = function () {
          $window.location.href = '/api/mylogout';
          $rootScope.authenticated = false;
          $rootScope.loggedInUser = {};
      };
      $scope.signup = function () {
          console.log($scope.userdata);
          UserFactory.addUser($scope.userdata).success(function (data) {
              console.log(data);
          }).error(function (error) {
              console.log(error);
          });

      };

      $scope.customLogin = function () {
          console.log($scope.userdata);
          UserFactory.customLogin($scope.userdata).error(function (error) {
              console.log(error);
              $scope.errorMessage = error.message;
          }).success(function () {
              $state.go('dashboard');
          });
      };

      $scope.setResponse = function (response) {
          console.log(response);
          $scope.userdata.captcha = response;
      };

  });
