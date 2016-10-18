'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FoliosSearchCtrl', function ($scope,$http,$routeParams,FolioFactory,GoogleFactory,UtilFactory)
  {
      $scope.obj = new FolioFactory();
    
      $scope.InvestmentTimelineOptions = $scope.obj.getInvestmentTimelineOptions();
      $scope.folioTypes = $scope.obj.getFolioTypes();
      $scope.folioCreationRangeOptions = $scope.obj.getFolioCreationRangeOptions();
      $scope.breadcrumbs = 'Search Folio';
      $scope.foliodata={
						folioStocks:[],
						tradeExecution:0
					};
					
	$scope.foliodata.userName={};
					
	function getMyFoliosComplete() {
	    $scope.obj.getMyFoliosComplete()
		    .success(function (folios) {
		  
		        for(var i=0;i<folios.length;i++)
		        {
					if(folios[i].image===null)
					{
						//console.log('image is null');
						//folios[i].image='http://placehold.it/200x140';
						folios[i].image='images/img_placeholder.jpg';
					}
				}
				$scope.myfolios = folios;
				$scope.searchResultFolios=folios;
				console.log(folios);
		    })
		    .error(function (error) {
		        $scope.status = 'Unable to load folios data: ' + error.message;
		    });
	    }
	    
	    
	   
	getMyFoliosComplete();
	
	$scope.searchFolio=function()
	{
		
		$scope.selectedInvestmentTimeLine=[];
		console.log($scope.InvestmentTimelineOptions);
		for(var i=0;i<$scope.InvestmentTimelineOptions.length;i++)
		{
			if($scope.InvestmentTimelineOptions[i].checked==true)
			{
				$scope.selectedInvestmentTimeLine.push($scope.InvestmentTimelineOptions[i].Id);
			}
		}
		
		$scope.selectedFolioTypes=[];
		console.log($scope.folioTypes);
		for(var i=0;i<$scope.folioTypes.length;i++)
		{
			if($scope.folioTypes[i].checked==true)
			{
				$scope.selectedFolioTypes.push($scope.folioTypes[i].Value);
			}
		}
		
		console.log($scope.selectedFolioTypes);
		
		$scope.selectedFolioCreationRange=[];
		console.log($scope.folioCreationRangeOptions);
		for(var i=0;i<$scope.folioCreationRangeOptions.length;i++)
		{
			if($scope.folioCreationRangeOptions[i].checked==true)
			{
				$scope.selectedFolioCreationRange.push($scope.folioCreationRangeOptions[i].Id);
			}
		}
		
		console.log($scope.selectedFolioCreationRange);
		
		
		 var folio = {
			userName:$scope.foliodata.userName.title,
		    name: $scope.foliodata.folioname,
		    description: $scope.foliodata.description,
		    folioType:$scope.selectedFolioTypes,
		    investmentTerm:$scope.selectedInvestmentTimeLine,
		    folioCreationRange:$scope.selectedFolioCreationRange,
		    timeLineDuration:$scope.foliodata.timeLineDuration,
		    riskAppetite:$scope.foliodata.riskAppetite,
	        expectedReturn:$scope.foliodata.expectedReturn,
        	keywords:$scope.foliodata.keywords,
		    value:$scope.foliodata.value
		    
		};
				
		
		console.log('searchingfor');
		console.log(folio);
		console.log(JSON.stringify(folio));
		
		$scope.obj.searchFolio(folio).success(function (data) {
			
			for(var i=0;i<data.length;i++)
		        {
					if(data[i].image===null)
					{
						//console.log('image is null');
						//data[i].image='http://placehold.it/200x140';
						data[i].image='images/img_placeholder.jpg';
					}
				}
				$scope.searchResultFolios=data;
			console.log('folio search results'+data);
		})
		.error(function (error) {
		        console.log(error);
		        alert('Unable to search folio');
		    });

	};
	
	$scope.filterSearchWrapper = false;
	$scope.filterSearch = function(){
		$scope.filterSearchWrapper = true;
	}
	
	$scope.closeFilerSearch = function(){
		$scope.filterSearchWrapper = false;
	}



	
   }		
  );
