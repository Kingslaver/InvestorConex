'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('MyCircleEditCtrl', function ($scope,$state,$stateParams,$routeParams,UserFactory,BaseFactory,ModalService) {

	
	console.log($stateParams.myCircleId);
	/* action */
	if($stateParams.myCircleId>0){
			getCircle($stateParams.myCircleId);
		}
		else{
			$scope.mycircle={userList:[]};				
		}
		
	BaseFactory.getData('/api/users/all').success(function (data) {
			$scope.users= data;
			});
			
	/* action end */
	
	
	//alert($stateParams.myCircleId);
	
	function getCircle(myCircleId){
		UserFactory.getCircle(myCircleId).success(function(response){
			$scope.mycircle=response;
			console.log($scope.mycircle);
		});
	};
	
	$scope.removeUser=function(user){
		for(var i=0;i<$scope.mycircle.userList.length;i++){
			if($scope.mycircle.userList[i].user.userId===user.user.userId){
				$scope.mycircle.userList.splice(i, 1);
				break;
			}
		}
	};
	
	$scope.saveCircle=function(){
		console.log($scope.mycircle);
		
		if($scope.mycircle.myCircleId && $scope.mycircle.myCircleId>0){
			UserFactory.updateCircle($scope.mycircle).success(function(mycircle){
			$scope.mycircle=mycircle;
			alert('Successfully saved');
			$state.go('userconnections');
			});
		}
		else{
			UserFactory.addCircle($scope.mycircle).success(function(mycircle){
			$scope.mycircle=mycircle;
			alert('Successfully saved');
			$state.go('userconnections');
			});
		}
		
		
	};
	
	$scope.addSelectedUser=function(){
		 for(var i=0;i<$scope.users.length;i++){
			 if($scope.users[i].userId===$scope.selectedUser){
				 console.log('user identified');
				 var newUser={user:{}};
				 newUser.user.userId=$scope.selectedUser;
				 newUser.user.firstName=$scope.users[i].firstName;
				 console.log(newUser);
				 $scope.mycircle.userList.push(newUser);
				 console.log($scope.mycircle.userList);
				 console.log($scope.mycircle);
			 }
		 }
		};
	
  });
