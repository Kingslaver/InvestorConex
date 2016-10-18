'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('TradesNewCtrl', function ($scope,$http,$state,$stateParams,$routeParams,GoogleFactory,UtilFactory,TraderFactory)
  {
	  var path = 'assets/stocks.json';
	$http.get(path).success(function (stocks) {
	   $scope.stocks=stocks;
	  // console.log($scope.stocks);
	  });
	  
	 $scope.foliodata={
					folioStocks:[]	
					};
	  
	  $scope.addSelectedStock=function(isValid){


		for (var i = 0; i < $scope.stocks.length; i++) {
			var element = $scope.stocks[i];
	       

		if (element.stockId === $scope.stocksMaster) {
		  
			console.log('selected stock symbol is '+element.stockSymbol);
		    $scope.isFetchingGooglePrice=true;
		   
		 			
			GoogleFactory.getStockLatestPrice(element.stockSymbol,element.exchangeName).success(function (data) {
		
			console.log('after google'+data);
			console.log(data);
			//console.log(data.stockPrice);
			
			$scope.stockLatestPrice=UtilFactory.convertGooglePrice(data);
				
			/* Now that we have the stocks latest price, calculate the current folio value for the currently existing stocks
			 (which will not include the new selection)*/
				
			
			var tradeData={ stock:{} };
			tradeData.stock.stockId=element.stockId;
			tradeData.stock.stockName=element.stockName;
			tradeData.stock.stockSymbol=element.stockSymbol;
			tradeData.quantity=0;
			tradeData.weightage=0;
			tradeData.entryPrice=$scope.stockLatestPrice;
			tradeData.marketPrice=$scope.stockLatestPrice;
			
			console.log(tradeData);
			
			$scope.foliodata.folioStocks.push(tradeData);
						
			console.log($scope.foliodata);
			 $scope.isFetchingGooglePrice=false;
		
		    })
		    .error(function(reason) {
				console.log(reason);
				alert('Unable to fetch price now. Please try again later');
				$scope.isFetchingGooglePrice=false;
			});

		  break;
			
		  
		   
	       } 
	    }
	
	};
	
	$scope.changeQuantity=function(folioStock)
	{
		console.log('changeQuantity');
		console.log($scope.foliodata);
		//stock.quantity=((stock.weightage/100)*$scope.foliodata.value)/stock.stockPrice;
		folioStock.subtotal=folioStock.quantity*folioStock.entryPrice;
		$scope.recalculateFolioValue();
		console.log('after');
		console.log(folioStock);
		
		
	};
	
	$scope.recalculateFolioValue=function()
	{
		console.log('recalculateFolioValue');
		console.log($scope.foliodata);
		var cost=0;
		for(var i=0; i< $scope.foliodata.folioStocks.length; i++)
		{
			cost=cost+($scope.foliodata.folioStocks[i].entryPrice * $scope.foliodata.folioStocks[i].quantity);
		}
		$scope.foliodata.cost=cost;
		console.log('after calculating');
		console.log($scope.foliodata);
			
	};
	
	$scope.addTrades=function(isValid){
		
		console.log('addTrades');
		$scope.submitted = true;
		console.log('isValid',isValid);
		
		if(!isValid)
		{
			alert('Please fix the errors in the form');
			return;
		}
		

		var folio = {
		   
		    cost:$scope.foliodata.cost,
		    folioStocks:$scope.foliodata.folioStocks
		};
				
		
		
		console.log(JSON.stringify(folio));
		
		TraderFactory.submitTrades(folio).success(function (data, status, headers, config) 
		{
			alert('New Trades successfully Submitted');
		})
		.error(function (error) {
		        console.log(error);
		        alert('Unable to submit foliodata');
		    });
		    
		};
	

	


	
	
	
	  
		
   }		
  );
