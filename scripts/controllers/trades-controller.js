'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('TradesListCtrl', function ($scope,$http,$state,$stateParams,$routeParams,GoogleFactory,TraderFactory)
  {
	  
	  $scope.trades={};
	  var path = 'assets/stocks.json';
	$http.get(path).success(function (stocks) {
	   $scope.stocks=stocks;
	  // console.log($scope.stocks);
	  });
	  
	  function getTrades() {
			//console.log('getTrades');
			TraderFactory.getTrades().success(function (trades) {
				console.log(trades);
				$scope.trades=trades;
				
			
		    })
		    .error(function (error) {
		        $scope.status = 'Unable to get trades data: ' + error.message;
		    });
	    }
	
		getTrades();
		
		
	
		
		
    
	$scope.done = function () {
                    // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                    $state.go('^', $stateParams);
                  };

		
   }		
  );
