'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FolioFollowCtrl', function ($scope,$http,$state,$stateParams,$routeParams,GoogleFactory,UtilFactory,FolioFactory)
  {
      $scope.obj = new FolioFactory();
    console.log('FolioFollowCtrl folioId'+$stateParams.folioId);
    $scope.timeLineOptions = $scope.obj.getTimeLineOptions();
    $scope.visibilityOptions = $scope.obj.getVisibilityOptions();
	$scope.amountToInvest=0;
	$scope.mode='FollowFolio';
	$scope.breadcrumbs='Follow Folio';
	
	var path = 'assets/stocks.json';
	$http.get(path).success(function (stocks) {
	   $scope.stocks=stocks;
	  // console.log($scope.stocks);
	  });
	  
	  
	
	//$scope.foliodata = FolioFactory.foliodata;
	
	
	
	function getFolio() {
	    $scope.foliodata = $scope.obj.foliodata;
		}
	
		getFolio();
		
		
	
	$scope.followFolioReal=function()
	{
		console.log('followFolioReal');
		console.log($scope.folioDataExecute);
		$scope.obj.folioDataExecute = $scope.folioDataExecute;
		$state.go('userhome.myfolios.details.follow.confirm', $stateParams);
	};
	
	
	$scope.followFolioVirtual=function()
	{
		console.log('followFolioVirtual');
		
		
	};
	
	$scope.showSaveFolioButton=function(){
			return false;
		}
		
	$scope.showSaveFollowFolioButton=function(){
			return true;
		}
		
		
	
	
	
	$scope.done = function () {
                    // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                    $state.go('^', $stateParams);
                  };

	





	
   }		
  );
