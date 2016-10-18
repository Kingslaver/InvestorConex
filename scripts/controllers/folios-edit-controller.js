'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FoliosEditCtrl', function ($scope,$http,$state,$stateParams,$routeParams,FolioFactory,GoogleFactory,UtilFactory)
  {
      $scope.obj = new FolioFactory();
    
	console.log('FoliosEditCtrl init');
	$scope.selectedTab=1;
	
	$scope.mode='Edit';
	$scope.breadcrumbs='Edit Folio';
	
	/* stocksMaster is the master list loaded from json.
	selectedStocks will have the ones selected by user
	load the master and store in scope.stocks*/

	$scope.timeLineOptions = $scope.obj.getTimeLineOptions();
	$scope.visibilityOptions = $scope.obj.getVisibilityOptions();
	

	$scope.stocksMaster={};
	$scope.selectedStocks=[];
    $scope.stockLatestPrice='';
    $scope.foliodata={
						folioStocks:[],
						tradeExecution:0
					};
					
	var path = 'assets/stocks.json';
	$http.get(path).success(function (stocks) {
	   $scope.stocks=stocks;
	  // console.log($scope.stocks);
	  });
	  
	$scope.foliodata = $scope.obj.foliodata;

	

	/* this will be called save add button in create folio is called.
	construct the json and call addFolio in factory to add a new folio */
	$scope.saveFolio=function(isValid){
		
		console.log('saveFolio');
		$scope.submitted = true;
		console.log('isValid',isValid);
				
		if(!isValid)
		{
			alert('Please fix the errors in the form');
			return;
		}
		
		var folio = {
			folioId:$scope.foliodata.folioId,
		    name: $scope.foliodata.name,
		    description: $scope.foliodata.description,
		    timeLine:$scope.foliodata.timeLine,
		    timeLineDuration:$scope.foliodata.timeLineDuration,
		    riskAppetite:$scope.foliodata.riskAppetite,
	        expectedReturn:$scope.foliodata.expectedReturn,
        	keywords:$scope.foliodata.keywords,
        	visibility:$scope.foliodata.visibility,
		    cost:$scope.foliodata.cost,
		    investmentAmount:$scope.foliodata.investmentAmount,
		    folioStocks:$scope.foliodata.folioStocks,
		    tradeExecution:$scope.foliodata.tradeExecution
		};
				
		
		//console.log(folio);
		console.log(JSON.stringify(folio));
		//var returndata=FolioFactory.addFolio(folio);
	    $scope.obj.updateFolio(folio).success(function (data, status, headers, config)
		{
			alert('Successfully updated');
		})
		.error(function (error) {
		        console.log(error);
		        alert('Unable to create folio');
		    });
		    
		};
		
		/* this will be called saveFolioAndExecute add button in create folio is called.
	construct the json and call addFolio in factory to add a new folio */
	$scope.displayExecuteTradesTab=function(isValid){
		
		$scope.action='saveandexecute';
		
		 
		};
		
		$scope.showSelectStocksSection=function(){
		
			return true;
		
		};
		
		$scope.showSaveFolioButton=function(){
			return true;
		};
		
		$scope.showEditCancelButton=function(){
			return true;
		};
		
		$scope.cancelEditButtonHandler=function(){
			 $state.go('^', $stateParams);
		 }
		
	
		
		
		
		



	$scope.addSelectedStock=function(isValid){

		console.log('addSelectedStock');
		$scope.addButtonClicked=true;
		if(!isValid )
		{
			//alert('Folio value should not be empty');
			//return;
		}

		//todo. validate if the stock has been added already or not

		/* loop through the orig stocks list and find out the stock id symbol name of the selected stock
		Call google service to fetch the latest price of the stock. 
		$scope.selectedStocks will now have the stockid,name,symbol, price of the selected stock
		which will be used later when sending to backend */

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
				
			
					
			
			var folioStockData={ stock:{} };
			folioStockData.stock.stockId=element.stockId;
			folioStockData.stock.stockName=element.stockName;
			folioStockData.stock.stockSymbol=element.stockSymbol;
			folioStockData.quantity=0;
			folioStockData.weightage=0;
			//folioStockData.stock.stockPrice=$scope.stockLatestPrice;
			
			
			folioStockData.entryPrice=$scope.stockLatestPrice;
			folioStockData.marketPrice=$scope.stockLatestPrice;
			
			//console.log(folioStockData);
			
			$scope.foliodata.folioStocks.push(folioStockData);
						
			
//$scope.foliodata.folioStocks.push({stockId:$scope.stocksMaster,stockName:element.stockName,stockSymbol:element.stockSymbol,stockPrice:$scope.stockLatestPrice,quantity:newQuantity,weightage:newWeightage,subtotal:newSubtotal});
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
	
	$scope.refreshStockPrice=function(folioStock){
		console.log('refreshStockPrice');
	//console.log(stock);
	GoogleFactory.getStockLatestPrice(folioStock.stock.stockSymbol,folioStocks.stock.exchangeName).success(function (data) {
			
			///todo . recalculate the folio value, quantity etc.
			folioStock.entryPrice=UtilFactory.convertGooglePrice(data);
			folioStock.quantity=((folioStock.weightage/100)*$scope.foliodata.investmentAmount)/folioStock.entryPrice;
			folioStock.subtotal=folioStock.quantity*folioStock.entryPrice;
		
			/*var googleResult=data.split('//');
			
			var obj = JSON.parse(googleResult[1]);
			//stock.stockPrice=obj[0].l_cur.replace('Rs.','');
			stock.stockPrice=obj[0].l_fix;*/
			

	 });
	};
	
	
	
	$scope.increaseWeightage=function(folioStock)
	{
		console.log('increaseWeightage' + folioStock);
		
		if(!($scope.foliodata.investmentAmount>0))
		{
			alert('Please input a value for InvestmentAmount');
			return;
		}	
	
		var weightage=folioStock.weightage;
		if(weightage+1 <=100)
		{
			folioStock.weightage=folioStock.weightage+1;
			folioStock.quantity=((folioStock.weightage/100)*$scope.foliodata.investmentAmount)/folioStock.entryPrice;
			folioStock.subtotal=folioStock.quantity*folioStock.entryPrice;
			$scope.recalculateFolioValue();
		}
				
		
		
	};
	

	$scope.reduceWeightage=function(folioStock)
	{
		if(!($scope.foliodata.investmentAmount>0))
		{
			alert('Please input a value for InvestmentAmount');
			return;
		}
		
		console.log('reduceWeightage' + folioStock);
		var weightage=folioStock.weightage;
		if(weightage-1 >= 0)
		{
			folioStock.weightage=stock.weightage-1;
			folioStock.quantity=((folioStock.weightage/100)*$scope.foliodata.investmentAmount)/folioStock.entryPrice;
			folioStock.subtotal=folioStock.quantity*folioStock.entryPrice;
			$scope.recalculateFolioValue();
		}
		
	};
	
	$scope.changeWeightage=function(folioStock)
	{
		
		console.log('changeWeightage' + folioStock);
		var weightage=folioStock.weightage;
		if(weightage<0 || weightage>100)
		{
			alert('Weightage should be between 0 and 100');
			return;
		}
		
		if(!($scope.foliodata.investmentAmount>0))
		{
			alert('Please input a value for InvestmentAmount');
			return;
		}
		
			folioStock.quantity=((folioStock.weightage/100)*$scope.foliodata.investmentAmount)/folioStock.entryPrice;
			folioStock.subtotal=folioStock.quantity*folioStock.entryPrice;
			$scope.recalculateFolioValue();
		
		
	};
	
	$scope.changeQuantity=function(folioStock)
	{
		console.log('changeQuantity');
		console.log($scope.foliodata);
		//stock.quantity=((stock.weightage/100)*$scope.foliodata.value)/stock.stockPrice;
		folioStock.subtotal=folioStock.quantity*folioStock.entryPrice;
		if($scope.foliodata.investmentAmount>0)
		{
			folioStock.weightage=(folioStock.subtotal/$scope.foliodata.investmentAmount)*100;
		}
		$scope.recalculateFolioValue();
		console.log('after');
		console.log(folioStock);
		
		
	};
	
	$scope.recalculateAllocations=function()
	{
		console.log('recalculateAllocations');
		for(var i=0; i< $scope.foliodata.folioStocks.length; i++){
			$scope.changeQuantity($scope.foliodata.folioStocks[i]);
		}
			
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
	
	
	
	$scope.removeStock=function(folioStock){
		
		console.log('removeStock');
		console.log(folioStock);
		var index=-1;
		for(var i=0; i< $scope.foliodata.folioStocks.length; i++)
		{
			
			if(folioStock.stock.stockSymbol===$scope.foliodata.folioStocks[i].stock.stockSymbol)
			{
				index=i;
				break;
			}
		}
		if(index!==-1)
		{
			//$scope.selectedStocks.splice(index,1);
			$scope.foliodata.folioStocks.splice(index,1);
			$scope.recalculateFolioValue();
				
		}
		
	};
	
	$scope.showBlogsSection=function(){
		return false;
	};
	
	$scope.showExecuteTradesSection=function()
	{
		
		if($scope.mode==='New' && $scope.action==='saveandexecute')
		{
			return true;
		}
		return false;
	};
	
	$scope.showBlogsSection=function()
	{
		return false;
	};
	
	

	$scope.searchFolio=function()
	{
		 var folio = {
		    name: $scope.foliodata.folioname,
		    description: $scope.foliodata.description,
		    timeLine:$scope.foliodata.timeLine,
		    timeLineDuration:$scope.foliodata.timeLineDuration,
		    riskAppetite:$scope.foliodata.riskAppetite,
	        expectedReturn:$scope.foliodata.expectedReturn,
        	keywords:$scope.foliodata.keywords,
		    value:$scope.foliodata.value
		    
		};
				
		
		console.log('searcing for '+folio);
		console.log(JSON.stringify(folio));
		
		$scope.obj.searchFolio(folio).success(function (data) {
			$scope.searchResultFolios=data;
			console.log('folio search results'+data);
		});

	};


	}
	
   	
  );
