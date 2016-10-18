'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('UserConnectionsCtrl', function ($scope,$state,$location,$stateParams,$routeParams,UserFactory,ModalService) {

	getMyCircles();
	getMyFollowers();
	getMyFollowings();
		  
	function getMyCircles(){
		UserFactory.getMyCircles().success(function(response){
			$scope.mycircleOptions=response;
			console.log($scope.mycircleOptions);
		}).error(function(error){
			alert('Error in fetching my circles');
			console.log(error);
		});
	};
	
	function getMyFollowers(){
		UserFactory.getMyFollowers().success(function(response){
			$scope.myFollowers=response;
			console.log($scope.myFollowers);
		}).error(function(error){
			alert('Error in fetching my getMyFollowers');
			console.log(error);
		});
	};
	
	function getMyFollowings(){
		UserFactory.getMyFollowings().success(function(response){
			$scope.myFollowings=response;
			console.log($scope.myFollowings);
		}).error(function(error){
			alert('Error in fetching my getMyFollowings');
			console.log(error);
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
		$location.path('#/user/usercircle/edit'+$scope.mycircle);
	};
	
	$scope.deleteCircle=function(){
		
	}
	
	$scope.removeUserFromMyFollowers=function(follower){
		for(var i=0;i<$scope.myFollowers.length;i++){
			if(follower.id===$scope.myFollowers[i].id){
				 $scope.myFollowers.splice(i,1);
				 break;
			}
		}
	};
	
	$scope.saveMyFollowers=function(){
		console.log($scope.myFollowers);
		UserFactory.updateMyFollowers($scope.myFollowers).success(function(data){
			console.log(data);
			alert('Successfully saved');
			$scope.myFollowers=data;
		}).error(function(error){
			alert('Error while saving. Please try again later');
			console.log(error);
		});
	};
	
	$scope.saveMyFollowing=function(){
		console.log($scope.myFollowings);
		UserFactory.updateMyFollowings($scope.myFollowings).success(function(data){
			console.log(data);
			alert('Successfully saved');
			$scope.myFollowings=data;
		}).error(function(error){
			console.log(error);
			alert('Error while saving. Please try again later');
		});
	};
	
	
	

  
  });
