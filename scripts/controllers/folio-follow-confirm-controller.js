'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FolioFollowConfirmCtrl', function ($scope,$http,$state,$stateParams,$routeParams,GoogleFactory,UtilFactory,FolioFactory,TraderFactory)
  {
    console.log('FolioFollowConfirmCtrl folioId'+$stateParams.folioId);
    $scope.obj = new FolioFactory();
    $scope.folioDataExecute = $scope.obj.folioDataExecute;
	console.log($scope.folioDataExecute);
	
	
	
	$scope.submitTrades=function()
	{
		
		TraderFactory.submitTrades($scope.folioDataExecute);
	};
	
	
	$scope.done = function () {
                    // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                    $state.go('^', $stateParams);
                  };

		
   }		
  );
