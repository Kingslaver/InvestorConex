'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('UserPageCtrl', function ($scope,$state,$rootScope,$location,$stateParams,$routeParams,UserFactory,FolioFactory,ModalService) {

	console.log($location.path());
	console.log($stateParams.userName);
	$scope.userName=$stateParams.userName;
	$scope.obj = new FolioFactory();
	$scope.userdata={};
		
	UserFactory.getAgeGroupOptions().success(function(data){
		$scope.ageGroupOptions=data;
		console.log($scope.ageGroupOptions);
	}).error(function(error){
		console.log(error);
	});
	
	UserFactory.getUserByName($stateParams.userName).success(function(response) {
		  $scope.userdata = response ? response : [];
		  console.log($scope.userdata);
		  getUserFoliosComplete();
		 });
		 
	$scope.followUser=function(){
		UserFactory.followUser($stateParams.userName).success(function(data){
			alert("Successfully saved");
			console.log(data);
			$scope.userdata.following=true;
		}).error(function(error){
			alert("Unable to save now");
			console.log(error);
		});
	};
	
	$scope.unfollowUser=function(){
		UserFactory.unfollowUser($stateParams.userName).success(function(data){
			alert("Successfully saved");
			console.log(data);
			$scope.userdata.following=false;
		}).error(function(error){
			alert("Unable to save now");
			console.log(error);
		});
	};
	
	function getUserFoliosComplete() {
	    $scope.obj.getUserFoliosComplete($scope.userdata.userId)
		    .success(function (folios) {
		        
		        for(var i=0;i<folios.length;i++)
		        {
					if(folios[i].image===null)
					{
						//console.log('image is null');
						//folios[i].image='http://placehold.it/100x100';
						folios[i].image='images/img_placeholder.jpg';
					}
				}
				$scope.myfolios = folios;
				//console.log(folios);
		    })
		    .error(function (error) {
		        $scope.status = 'Unable to load folios data: ' + error.message;
		    });
	    }
	   
     
	

  });
