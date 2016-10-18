'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:AdvisoryCtrl
 * @description
 * # AdvisoryCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('AdvisoryCtrl', function ($scope,$http,$state,$stateParams,$routeParams,AdvisoryFactory)
  {
    $scope.searchResultAdvisors=[];
    $scope.advisorydata={};
    
    getLocationOptions();
    getSecurityTypeOptions();
    getMinimumInvestmentOptions();
    
    function getLocationOptions(){
		AdvisoryFactory.getLocation().success(function(data){
			console.log(data);
			$scope.locationOptions=data;
		}).error(function(error){
			console.log(error);
		});
	};
	
	function getSecurityTypeOptions(){
		AdvisoryFactory.getSecurityType().success(function(data){
			console.log(data);
			$scope.securityTypeOptions=data;
		}).error(function(error){
			console.log(error);
		});
	};
	
	function getMinimumInvestmentOptions(){
		AdvisoryFactory.getMinimumInvestment().success(function(data){
			console.log(data);
			$scope.minimumInvestmentOptions=data;
		}).error(function(error){
			console.log(error);
		});
	};
	
    $scope.searchAdvisors=function()
	{
		
		$scope.selectedLocation=[];
		console.log($scope.locationOptions);
		for(var i=0;i<$scope.locationOptions.length;i++)
		{
			if($scope.locationOptions[i].checked==true)
			{
				$scope.selectedLocation.push($scope.locationOptions[i].locationId);
			}
		}
		
		$scope.selectedSecurityType=[];
		console.log($scope.securityTypeOptions);
		for(var i=0;i<$scope.securityTypeOptions.length;i++)
		{
			if($scope.securityTypeOptions[i].checked==true)
			{
				$scope.selectedSecurityType.push($scope.securityTypeOptions[i].securityTypeId);
			}
		}
		
		$scope.selectedMinimumInvestment=[];
		console.log($scope.minimumInvestmentOptions);
		for(var i=0;i<$scope.minimumInvestmentOptions.length;i++)
		{
			if($scope.minimumInvestmentOptions[i].checked==true)
			{
				$scope.selectedMinimumInvestment.push($scope.minimumInvestmentOptions[i].minimumInvestmentId);
			}
		}
		
		
		 var advisory = {
		    name: $scope.advisorydata.name,
		    selectedLocation:$scope.selectedLocation,
		    selectedSecurityType:$scope.selectedSecurityType,
		    selectedMinimumInvestment:$scope.selectedMinimumInvestment
		   
		    
		};

		
		console.log(advisory);
		console.log(JSON.stringify(advisory));
		AdvisoryFactory.searchAdvisory(advisory).success(function (data) {
			$scope.searchResultAdvisors=data;
			console.log(data.length);
			console.log(data);
		});

		 //$state.go('advisory.list', $stateParams);

	};

	



   }		
  );
