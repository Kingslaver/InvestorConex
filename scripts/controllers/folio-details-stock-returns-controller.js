'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FolioStockReturnsCtrl', function ($scope,$sce, $http, $state, $stateParams, $routeParams, GoogleFactory, FolioFactory, UserFactory,UtilFactory, ModalService, Blog) {

     console.log($stateParams.folioId);
     console.log($stateParams.stockId);
     
     $scope.obj = new FolioFactory();
     $scope.labels=[];
     $scope.data=[];
     $scope.temp=[];
     
     $scope.obj.getFolioStockReturns($stateParams.folioId,$stateParams.stockId).success(function(data){
		 $scope.folioStockReturnsData=data;
		 console.log($scope.folioStockReturnsData);
		 console.log($scope.folioStockReturnsData.length);
		 
		 for(var i=0;i<$scope.folioStockReturnsData.length;i++){
			  var date = new Date($scope.folioStockReturnsData[i].timestamp)
			  $scope.labels.push(date.getDate());
			  $scope.temp.push($scope.folioStockReturnsData[i].profitPct);
		 }
		 $scope.data.push($scope.temp);
		 
		 console.log($scope.labels);
		 console.log($scope.data);
		 
	 
	 }).error(function(error){
		 console.log(error);
	 });
	 
	 
	 
	
  

  
  }
  );
