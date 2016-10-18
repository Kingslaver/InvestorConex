'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('UserCtrl', function ($scope,$state,$rootScope,$location,$stateParams,$routeParams,UserFactory,FolioFactory,ModalService) {

	console.log($location.path());
	console.log($stateParams.userName);
	$scope.obj = new FolioFactory();
	$scope.InvestmentTimelineOptions = $scope.obj.getInvestmentTimelineOptions();
	$scope.InvestmentAmountOptions = $scope.obj.getInvestmentAmountOptions();
	$scope.userdata={};
	
	
	UserFactory.getAgeGroupOptions().success(function(data){
		$scope.ageGroupOptions=data;
		console.log($scope.ageGroupOptions);
	}).error(function(error){
		console.log(error);
	});
	
	
    $scope.userId = $stateParams.userId;
    
    /* get the user id from url. load the user data via rest and store it in scope.userdata. save the response's tjaccountid in a variable
		which will beused later */
   	UserFactory.getUser().success(function(response) {
		  $scope.userdata = response ? response : [];
		//  console.log($scope.userdata);
		  $scope.tjAccountId=$scope.userdata.tjAccountId;
		  getMyCircleOptions();
		});
	
	
	$scope.HasTJAccount = 'No'; //default value for the radio button
	  
 	function getMyCircleOptions(){
		UserFactory.getMyCircles().success(function(response){
			$scope.mycircleOptions=response;
			console.log($scope.mycircleOptions);
		}).error(function(error){
			alert('Error in fetching my circles');
			console.log(error);
		});
	};
   
     
	/* update function that sends a PUT request to the server */
    $scope.updateUser = function($rootScope){
		console.log('update user');
		console.log($scope.userdata);
		
		UserFactory.updateUser($scope.userdata).success(function(response){
			$scope.userdata=response;
			alert("Successfully saved");
			console.log($scope.userdata);
			UserFactory.loggedInUser=angular.copy($scope.userdata);
			console.log(UserFactory.loggedInUser);
			$scope.tjAccountId=$scope.userdata.tjAccountId;
		}).error(function(error){
			console.log(error);
			alert("Unable to save. Please try again later");
			});
			
		};
		
	
	$scope.circleSelected=function(){
		//alert($scope.mycircle);
		for(var i=0;i<$scope.mycircleOptions.length;i++){
			if($scope.mycircleOptions[i].myCircleId==$scope.mycircle){
				$scope.selectedCircleUsers=angular.copy($scope.mycircleOptions[i].userList);
				console.log($scope.selectedCircleUsers);
				break;
			}
		}
		
	};
	
	$scope.editCircle=function(){
		$stateParams.myCircleId=$scope.mycircle;
		$state.go('usercircle.edit', $stateParams);
	};
	


  });
