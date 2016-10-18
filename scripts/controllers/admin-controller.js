'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:CsvCtrl
 * @description
 * # CsvCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('AdminCtrl', function ($scope,$location,FolioFactory,UserFactory) {
   // console.log($location);
    var url = $location.url();
    console.log(url);
    $scope.obj = new FolioFactory();
     
    if(url === '/adminimageapprove'){
		getAdminUnapprovedImages();
	}
	if(url === '/adminusercontrol'){
		getAdminUnapprovedImages();
	}
	
	function getAdminUnapprovedImages() {
	    $scope.obj.getAdminUnapprovedImages()
		    .success(function (folios) {
		        
				$scope.myfolios = folios;
				console.log(folios);
		    })
		    .error(function (error) {
		        $scope.status = 'Unable to load folios data: ' + error.message;
		    });
	    }
	    
	 $scope.save=function(){
			console.log($scope.myfolios);
			$scope.obj.adminUpdateFolioForImagesApproval($scope.myfolios)
				.success(function (folios) {
		        
				$scope.myfolios = folios;
				console.log(folios);
		    })
		    .error(function (error) {
		        $scope.status = 'Unable to load folios data: ' + error.message;
		    });
		};
		
	$scope.fetchUserDetails=function(){
		console.log($scope.userName);
		UserFactory.getUserByNameForAdmin($scope.userName.title).success(function(response) {
		  $scope.userdata = response ? response : [];
		  if($scope.userdata.enabled===1){
			  $scope.userdata.enabled=true;
		  }
		  else{
			  $scope.userdata.enabled=false;
		  }
		  
		  console.log($scope.userdata);
		 // $scope.userdata.enabled=true;
		 });
	};
	
	$scope.usersave=function(){
		console.log($scope.userdata);
		if($scope.userdata.enabled===true){
			  $scope.userdata.enabled=1;
		  }
		  else{
			  $scope.userdata.enabled=0;
		  }
		UserFactory.updateUser($scope.userdata).success(function(response) {
		  $scope.userdata = response ? response : [];
		  if($scope.userdata.enabled===1){
			  $scope.userdata.enabled=true;
		  }
		  else{
			  $scope.userdata.enabled=false;
		  }
		  
		  console.log($scope.userdata);
		 // $scope.userdata.enabled=true;
		 });
	};
		
	
  });
