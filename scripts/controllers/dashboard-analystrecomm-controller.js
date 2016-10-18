'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('DashboardAnalystRecommCtrl', function ($scope,$http,$location,GoogleFactory,UtilFactory,FolioFactory)
  {
      $scope.obj = new FolioFactory();
      $scope.analystSearch={
		  analystList:[],
		  stocksList:[],
		  recommStartDate:new Date(),
		  recommEndDate:new Date(),
		  cbBuy:true,
		  cbSell:true
		  
	  };
	  $scope.pageNumber=1;
	  var path = 'assets/stocks.json';
      $http.get(path).success(function (stocks) {
          $scope.stocks = stocks;
          // console.log($scope.stocks);
      });
	  
	 var url=$location.path();
	 
	 
	 if(url==='/analystrecommendations'){
		 getAllAnalystRecommendations(0);
		 getAnalysts();
	 }
	 else
	 {
		 getTopAnalystRecommendations();
	 }
	 
	 
	
	function getTopAnalystRecommendations() {
			$scope.obj.getTopAnalystRecommendations()
				.success(function (analystTopRecommendations) {
					
					$scope.analystTopRecommendations = analystTopRecommendations;
					console.log(analystTopRecommendations);
					
				})
				.error(function (error) {
					$scope.status = 'Unable to load analystTopRecommendations data: ' + error.message;
				});
	    }
	    
	    $scope.getAllAnalystRecommendations=function(pageNumber){
			console.log("scope pageNumber"+pageNumber);
			getAllAnalystRecommendations(pageNumber);
	    };
		
		$scope.getNextPage=function(){
			console.log("getNextPage");
			$scope.pageNumber=$scope.pageNumber+1;
			getAllAnalystRecommendations($scope.pageNumber);
		};
		
		$scope.getPrevPage=function(){
			console.log("getPrevPage");
			$scope.pageNumber=$scope.pageNumber-1;
			getAllAnalystRecommendations($scope.pageNumber);
		};
		
	 
	    
	 function getAllAnalystRecommendations(pageNumber) {
			console.log("normal pageNumber"+pageNumber);
			
			$scope.obj.getAllAnalystRecommendations(pageNumber)
				.success(function (analystRecommendations) {
					
					$scope.analystRecommendations = analystRecommendations;
					console.log(analystRecommendations);
					
					 for (var i = 0; i < $scope.analystRecommendations.length; i++) {
		                   updatePrice($scope.analystRecommendations[i]);
		              }
					
					$scope.totalPages=0;
					if($scope.analystRecommendations.length>0){
						$scope.totalPages=$scope.analystRecommendations[0].totalPages;
					}
					console.log('total pages'+$scope.totalPages);
									
					
				})
				.error(function (error) {
					$scope.status = 'Unable to load analystRecommendations data: ' + error.message;
				});
	    }
	    
	    $scope.getNumber = function(num) {
			return new Array(num);   
		}
	    
	    function updatePrice(analystRecomm) {
			return;
	          //console.log(folioStocks);
	          GoogleFactory.getStockLatestPrice(analystRecomm.stock.stockSymbol,analystRecomm.stock.exchangeName).success(function (data) {

	              //console.log(folioStocks);
	        	  analystRecomm.currentPrice = UtilFactory.convertGooglePrice(data);
	        	  analystRecomm.profit = (analystRecomm.currentPrice - analystRecomm.price);
	          });
	      }
	    
	    
	    function getAnalysts(){
			
			$scope.obj.getAnalysts()
				.success(function (data) {
					$scope.analysts = data;
					console.log(data);
					
				})
				.error(function (error) {
					$scope.status = 'Unable to load analystTopRecommendations data: ' + error.message;
				});
			
		}
	
	$scope.addSelectedAnalyst=function(){
		console.log($scope.selectedAnalystId);
		for(var i=0;i<$scope.analysts.length;i++){
			//console.log($scope.analysts[i].id);
			if($scope.selectedAnalystId === $scope.analysts[i].id){
				console.log('found');
				var analyst={};
				analyst.id=$scope.selectedAnalystId;
				analyst.name=$scope.analysts[i].name;
				$scope.analystSearch.analystList.push(analyst);
				console.log($scope.analystSearch);
			}
		}
	};
	
	$scope.addSelectedStock=function(){
		console.log($scope.selectedStockId);
		for(var i=0;i<$scope.stocks.length;i++){
			//console.log($scope.analysts[i].id);
			if($scope.selectedStockId === $scope.stocks[i].stockId){
				console.log('found');
				var stock={};
				stock.stockId=$scope.selectedStockId;
				stock.stockName=$scope.stocks[i].stockName;
				$scope.analystSearch.stocksList.push(stock);
				console.log($scope.analystSearch);
			}
		}
	};
	
	$scope.searchAnalyst=function(){
		console.log($scope.analystSearch);
		$scope.totalPages=0;
		$scope.obj.searchAnalyst($scope.analystSearch)
				.success(function (data) {
					$scope.analystRecommendations = data;
					for (var i = 0; i < $scope.analystRecommendations.length; i++) {
		                   updatePrice($scope.analystRecommendations[i]);
		              }
					console.log(data);
					
				})
				.error(function (error) {
					$scope.status = 'Unable to load analystRecommendations search: ' + error.message;
				});
	};
	
	$scope.removeAnalyst=function(analyst){
		console.log(analyst);
		for(var i=0;i<$scope.analystSearch.analystList.length;i++){
			if($scope.analystSearch.analystList[i].id===analyst.id){
				
				$scope.analystSearch.analystList.splice(i, 1);
				break;
			}
		}
	};
	
	$scope.removeStock=function(stock){
		console.log(stock);
		for(var i=0;i<$scope.analystSearch.stocksList.length;i++){
			if($scope.analystSearch.stocksList[i].stockId===stock.stockId){
				
				$scope.analystSearch.stocksList.splice(i, 1);
				break;
			}
		}
	};
	
	
	
	
	
		
   }		
  );
