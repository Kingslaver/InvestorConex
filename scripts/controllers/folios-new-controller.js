'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FoliosNewCtrl', function ($scope, $http, $state, $stateParams, $routeParams, $filter, UserFactory,FolioFactory, GoogleFactory, UtilFactory,Blog) {
      // $scope.msgobj = new Message();
      $scope.obj = new FolioFactory();
      $scope.objBlog = new Blog();
      $scope.selectedTab = 1;//basic details tab
      $scope.mode = 'New';
      $scope.breadcrumbs = 'Create Folio';
      
      $scope.isBlogPost = false;
      $scope.showCreateBlogPost = false;
      $scope.showCreateForm = false;
      $scope.newblog = {};
      $scope.newblogPost = {};
      $scope.newblog.blogName = '';
      $scope.newblog.blogDescription = '';
      $scope.newblog.folioId = 0;
      $scope.newBlogData = ''; // Needs to update this data to post http 
     
      $scope.visibilityOptions = $scope.obj.getVisibilityOptions();
      $scope.InvestmentTimelineOptions = $scope.obj.getInvestmentTimelineOptions();
      $scope.InvestmentAmountOptions = $scope.obj.getInvestmentAmountOptions();
           
      $scope.isweightage = false;
      $scope.stockCount = 0;
      $scope.tweightage = 0;
      $scope.weightage = 0;
      $scope.stocksMaster = {};
      $scope.selectedStocks = [];
      $scope.stockLatestPrice = '';
      $scope.foliodata = {
          folioStocks: [],
          tradeExecution: 0,
          isVirtualFolio:true,
          folioMyCircle:[],
          totalWeightage:0
      };
      
     
      
      console.log('folio id '+$stateParams.folioId);
      if($stateParams.folioId>0)
      {
		  $scope.breadcrumbs='Edit Folio';
		  $scope.mode='Edit';
		  console.log('inside folio id');
		  getFolio();
	  }
	  else
	  {  
		getMyCircleOptions();
	  }
	  getRiskAppetiteOptions();
	
      var path = 'assets/stocks.json';
      $http.get(path).success(function (stocks) {
          $scope.stocks = stocks;
          // console.log($scope.stocks);
      });
      
      function getRiskAppetiteOptions()
      {
		  $scope.obj.getRiskAppetiteOptions().success(function(data){
			  console.log(data);
			  $scope.riskAppetiteOptions = data;
		  }).error(function(error){
			  console.log(error);
		  });
	  }
		   
      
      function getFolio() {
          $scope.obj.getFolio($stateParams.folioId).success(function (folio) {
              //console.log(folio.folioId);
              //console.log(folio);
              $scope.foliodata = folio;
              $scope.foliodata.currentFolioValue = 0;

              for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
                  //console.log(i);
                  updatePrice($scope.foliodata.folioStocks[i]);

              }

              $scope.obj.foliodata = $scope.foliodata;
              $scope.newblog = $scope.foliodata.blogList[0];
              
              if($scope.newblog)
              {
				$scope.blogId = $scope.newblog.blogId;
				$scope.foliodata.blogList[0].blogPosts = $scope.objBlog.getAllPosts($scope.newblog.blogId);
			  }
              console.log($scope.foliodata);
              getFolioAssociations();
              getMyCircleOptions();

          })
          .error(function (error) {
              $scope.status = 'Unable to load folio data: ' + error.message;
          });

      }

      function getFolioAssociations() {
          $scope.obj.getFolioAssociations($stateParams.folioId).success(function (folioassociations) {
             // console.log('folioassociations');
              //console.log(folio.folioId);
              //console.log(folio);
              $scope.folioassociations = folioassociations;
              console.log(folioassociations);
          })
          .error(function (error) {
              $scope.status = 'Unable to load folio data: ' + error.message;
          });
      };
      
      function getMyCircleOptions(){
		UserFactory.getMyCircles().success(function(response){
			$scope.mycircleOptions=response;
			console.log($scope.mycircleOptions);
			bindMyCircle();
		}).error(function(error){
			alert('Error in fetching my circles');
			console.log(error);
		});
	};
	
	function  bindMyCircle(){
		console.log('bindMyCircle');
		$scope.foliodata.mycircle=[];
		if($scope.foliodata.folioMyCircle.length>0){
			for(var i=0;i<$scope.foliodata.folioMyCircle.length;i++){
				console.log($scope.foliodata.folioMyCircle[i].myCircle.myCircleId);
				$scope.foliodata.mycircle.push($scope.foliodata.folioMyCircle[i].myCircle.myCircleId);
			}
		}
		console.log($scope.foliodata.mycircle);
	};

      /* this will be called save add button in create folio is called.
      construct the json and call addFolio in factory to add a new folio */
      $scope.saveFolio = function (form) {
          console.log('saveFolio');
          $scope.submitted = true;
          console.log('form', form);

          if (!form.$valid) {
              alert('Please fix the errors in the form');
              return;
          }
          
          if($scope.foliodata.weightage > 100){
			  alert('Total weightage cannot be greater than 100');
			  return;
		  }
          
          if($scope.foliodata.cost > $scope.foliodata.investmentAmount){
			  alert('Cost cannot be greater than InvestmentAmount');
			  return;
		  }
		  
		  
          if($scope.foliodata.mycircle){
			  console.log($scope.foliodata.mycircle);
			  var folioMyCircle=[];
			  for(var i=0;i<$scope.foliodata.mycircle.length;i++){
				  
			   var followers = { myCircle: {} };
			   followers.myCircle.myCircleId=$scope.foliodata.mycircle[i];
			   folioMyCircle.push(followers);
				}
			   console.log(folioMyCircle);
	   }
          var folio = {
			  file:$scope.file,
              folioId: $scope.foliodata.folioId,
              name: $scope.foliodata.name,
              description: $scope.foliodata.description,
              timeLine: $scope.foliodata.timeLine,
              timeLineDuration: $scope.foliodata.timeLineDuration,
              riskAppetite: $scope.foliodata.riskAppetite,
              expectedReturn: $scope.foliodata.expectedReturn,
              keywords: $scope.foliodata.keywords,
              visibility: $scope.foliodata.visibility,
              cost: $scope.foliodata.cost,
              investmentAmount: $scope.foliodata.investmentAmount,
              folioStocks: $scope.foliodata.folioStocks,
              tradeExecution: $scope.foliodata.tradeExecution,
              minInvestment: $scope.foliodata.minInvestment,
              investmentPct: $scope.foliodata.investmentPct,
              investmentTerm: $scope.foliodata.investmentTerm,
              isVirtualFolio: $scope.foliodata.isVirtualFolio,
              mycircle: $scope.mycircle,
              folioMyCircle:folioMyCircle
          };


          console.log(folio);
          console.log(JSON.stringify(folio));
         
          $scope.obj.saveFolio(folio).success(function (data, status, headers, config) {
              alert('Successfully Saved');
              $scope.foliodata = data;
		 for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
                  console.log(i); //testing
                  updatePrice($scope.foliodata.folioStocks[i]);
              }
              console.log(data);
              //$state.go('userhome.myfolios.details',{folioId:$scope.foliodata.folioId});
          })
          .error(function (error) {
              console.log(error);
              alert('Unable to perform the action');
          });

      };
     
      $scope.displayExecuteTradesTab = function (isValid) {
          $scope.action = 'saveandexecute';
      };
      $scope.showSelectStocksSection = function () {
          return true;
      }
      $scope.showSaveFolioButton = function () {
          return true;
      }

      $scope.addSelectedStock = function (isValid) {
          console.log('addSelectedStock');
          $scope.addButtonClicked = true;
          /* loop through the orig stocks list and find out the stock id symbol name of the selected stock
          Call google service to fetch the latest price of the stock. 
          $scope.selectedStocks will now have the stockid,name,symbol, price of the selected stock
          which will be used later when sending to backend */
          var element = $filter('filter')($scope.stocks, { stockId: $scope.stocksMaster }, true)[0];
          var folioStock = $filter('filter')($scope.foliodata.folioStocks, { stock: element }, true)[0];
		  if ($scope.foliodata.folioStocks.indexOf(folioStock) == -1) {
              console.log('selected stock symbol is ' + element.stockSymbol);
              $scope.isFetchingGooglePrice = true;
			  GoogleFactory.getStockLatestPrice(element.stockSymbol,element.exchangeName).success(function (data) {
                  console.log('after google' + data);
                  $scope.stockLatestPrice = UtilFactory.convertGooglePrice(data);
                  /* Now that we have the stocks latest price, calculate the current folio value for the currently existing stocks
                   (which will not include the new selection)*/
                 
                   if ($scope.foliodata.folioStocks.length > 0) {
                      if ($scope.stockCount > 0) {
                          $scope.isweightage = true;
                          for (var i = 0; i < $scope.stockCount ; i++) {
                              var obj= $scope.foliodata.folioStocks[i];
                              $scope.weightage = parseInt($scope.weightage, 10) + parseInt(obj.weightage, 10);
                          }
                      }
                   }
                  if (!$scope.isweightage) {
                      var len = $scope.foliodata.folioStocks.length + 1;
                      $scope.tweightage = len > 0 ? Math.round(100 / len * 100) / 100 : 0;
                      if ($scope.foliodata.folioStocks.length > 0) {
                          angular.forEach($scope.foliodata.folioStocks, function (obj) {
                              obj.weightage = $scope.tweightage;
                          }, $scope.foliodata.folioStocks);
                      }
                  }
                  else {
                      var msweitage = 100 - $scope.weightage;
                      if (msweitage > 0) {
                      var len = $scope.foliodata.folioStocks.length - $scope.stockCount + 1;
                      $scope.tweightage = len > 0 ? Math.round(msweitage / len * 100) / 100 : 1;
                          if ($scope.foliodata.folioStocks.length > 0 && len > 1) {
                              for (var i = $scope.stockCount; i <= $scope.foliodata.folioStocks.length - 1 ; i++) {
								$scope.foliodata.folioStocks[i].weightage = $scope.tweightage;
                              }
							}
                      }
                      else {
                          $scope.tweightage = 0;
                      }
                  }

                  var folioStockData = { stock: {} };
                  folioStockData.stock = element;//.stockId;
                  folioStockData.add=true;
                  //folioStockData.stock.stockName = element.stockName;
                  //folioStockData.stock.stockSymbol = element.stockSymbol;
                  folioStockData.quantity = 0;
                  folioStockData.subtotal = 0;
                  folioStockData.weightage = $scope.tweightage;
                  //folioStockData.stock.stockPrice=$scope.stockLatestPrice;
                  folioStockData.entryPrice = $scope.stockLatestPrice;
                  folioStockData.marketPrice = $scope.stockLatestPrice;
                 //console.log(folioStockData);
                  $scope.foliodata.folioStocks.push(folioStockData);
                  $scope.recalculateAllocations();
                  //$scope.foliodata.folioStocks.push({stockId:$scope.stocksMaster,stockName:element.stockName,stockSymbol:element.stockSymbol,stockPrice:$scope.stockLatestPrice,quantity:newQuantity,weightage:newWeightage,subtotal:newSubtotal});
                  $scope.isFetchingGooglePrice = false;
                  $scope.weightage = 0;

              })
              .error(function (reason) {
                  console.log(reason);
                  alert('Unable to fetch price now. Please try again later');
                  $scope.isFetchingGooglePrice = false;
              });

          }
          else { alert('The stock already in stock list. Select a different stock'); }
      };

      $scope.refreshStockPrice = function (folioStock) {
          //console.log('refreshStockPrice');
          //console.log(stock);
          GoogleFactory.getStockLatestPrice(folioStock.stock.stockSymbol,folioStocks.stock.exchangeName).success(function (data) {
              folioStock.entryPrice = UtilFactory.convertGooglePrice(data);
              folioStock.marketPrice=folioStock.entryPrice;
              folioStock.quantity = Math.round(((folioStock.weightage / 100) * $scope.foliodata.investmentAmount) / folioStock.entryPrice);
              folioStock.subtotal = folioStock.quantity * folioStock.entryPrice;
          });
      };

     
      $scope.changeWeightage = function (folioStock) {
         console.log('changeWeightage' + folioStock);
         $scope.stockCount = $scope.foliodata.folioStocks.length;
		   if (($scope.foliodata.investmentAmount > 0)) {
			  folioStock.quantity = Math.floor(((folioStock.weightage / 100) * $scope.foliodata.investmentAmount) / folioStock.entryPrice);
			  folioStock.subtotal = folioStock.quantity * folioStock.entryPrice;
			  $scope.recalculateFolioValue();
		  }
      };

      $scope.changeQuantity = function (folioStock) {
          // foliodata.investmentAmount
          console.log('changeQuantity');
          //console.log(folioStock);
          //stock.quantity=((stock.weightage/100)*$scope.foliodata.value)/stock.stockPrice;
          //console.log('investmentAmount:' + $scope.foliodata.investmentAmount);
          //console.log('Weightage:' + folioStock.weightage);
          folioStock.subtotal = folioStock.quantity * folioStock.entryPrice;
         // folioStock.quantity = folioStock.subtotal / folioStock.entryPrice;
          //console.log('total:' + folioStock.subtotal);
          //console.log('quan:' + folioStock.quantity);
          if($scope.foliodata.investmentAmount>0)
          {
          	folioStock.weightage=(folioStock.subtotal/$scope.foliodata.investmentAmount)*100;
          }
          $scope.recalculateFolioValue();
          //console.log('after');
          //console.log(folioStock);

      };
      
      $scope.investmentAmountChanged=function(){
		  
		  angular.forEach($scope.foliodata.folioStocks, function (obj) {
			   obj.subtotal=$scope.foliodata.investmentAmount * obj.weightage / 100;// * folioStock.entryPrice;
			   obj.quantity = Math.floor(obj.subtotal / obj.entryPrice);

		   }, $scope.foliodata.folioStocks);
		   $scope.recalculateFolioValue();
	  }

      $scope.recalculateAllocations = function () {
		  console.log('recalculateAllocations');
          angular.forEach($scope.foliodata.folioStocks, function (obj) {
              $scope.changeWeightage(obj);
          }, $scope.foliodata.folioStocks);
      };
      
      $scope.recalculateFolioValue = function () {
          var cost = 0;
          var weightage = 0;
          angular.forEach($scope.foliodata.folioStocks, function (obj) {
			  if(!obj.remove){
				  cost = cost + (obj.entryPrice * obj.quantity);
				  console.log(obj.weightage);
				  weightage = parseInt(weightage) + parseInt(obj.weightage);
			}
          }, $scope.foliodata.folioStocks);
          $scope.foliodata.cost = cost;
          $scope.foliodata.weightage=weightage;
      };
      
      $scope.removeStock = function (folioStock, isweightage) {
		  console.log(folioStock);
          var index = -1;
          for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
              if (folioStock.stock.stockSymbol === $scope.foliodata.folioStocks[i].stock.stockSymbol) {
                  index = i;
                  if(folioStock.id>0){
					folioStock.remove=true;
					}
					else
					{
						$scope.foliodata.folioStocks.splice(index, 1);
					}
                  break;
              }
          }
          if (index !== -1) {
              //$scope.selectedStocks.splice(index,1);
           //   $scope.foliodata.folioStocks.splice(index, 1);
              $scope.stockCount = $scope.foliodata.folioStocks.length;
              $scope.recalculateFolioValue();
          }
      };
      
       /// blog operations end
      function updatePrice(folioStocks) {
          //console.log(folioStocks);
          GoogleFactory.getStockLatestPrice(folioStocks.stock.stockSymbol,folioStocks.stock.exchangeName).success(function (data) {
              //console.log(folioStocks);
              folioStocks.marketPrice = UtilFactory.convertGooglePrice(data);
              folioStocks.subtotal = folioStocks.quantity * folioStocks.marketPrice;
              folioStocks.profit = (folioStocks.marketPrice - folioStocks.entryPrice) * folioStocks.quantity;
              if (folioStocks.marketPrice < folioStocks.entryPrice) {
                  folioStocks.profitPct = ((folioStocks.marketPrice - folioStocks.entryPrice) / folioStocks.entryPrice) * 100;
              }
              else {
                  folioStocks.profitPct = ((folioStocks.marketPrice - folioStocks.entryPrice) / folioStocks.entryPrice) * 100;
              }
              //$scope.foliodata.currentFolioValue=$scope.foliodata.currentFolioValue+(folioStocks.marketPrice*folioStocks.quantity);
              $scope.recalculateFolioValue();
          });
      }

     /* function recalculateFolioValue() {
          console.log('recalculateFolioValue');
          console.log($scope.foliodata);
          var currentFolioValue = 0;
          for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
              currentFolioValue = currentFolioValue + ($scope.foliodata.folioStocks[i].marketPrice * $scope.foliodata.folioStocks[i].quantity);
          }
          $scope.foliodata.currentFolioValue = currentFolioValue;
          console.log('after calculating');
          console.log($scope.foliodata);

      }*/

      $scope.showBlogsSection = function () {
		  if($scope.foliodata.folioId>0)
		  {
			  return true;
		  }
	      return false;
      };

      $scope.showExecuteTradesSection = function () {
          if ($scope.mode === 'New' && $scope.action === 'saveandexecute') {
              return true;
          }
          return false;
      };

      $scope.showBlogsPostSection = function () {
          return false;
      };



      $scope.searchFolio = function () {
          var folio = {
              name: $scope.foliodata.folioname,
              description: $scope.foliodata.description,
              timeLine: $scope.foliodata.timeLine,
              timeLineDuration: $scope.foliodata.timeLineDuration,
              riskAppetite: $scope.foliodata.riskAppetite,
              expectedReturn: $scope.foliodata.expectedReturn,
              keywords: $scope.foliodata.keywords,
              value: $scope.foliodata.value

          };
          console.log(JSON.stringify(folio));
          $scope.obj.searchFolio(folio).success(function (data) {
              $scope.searchResultFolios = data;
          });

      };
      
      $scope.resetCreateBlogForm = function () {
          $scope.showCreateForm = true;
          //$scope.newBlogTitle = "";
          $scope.newBlogData = '';
          //$scope.newblog = {};
      };

      ///blog operations starts

      $scope.saveBlog = function (form) {
          //$scope.newBlogData = $scope.newblog.title + ":" + $scope.newblog.description;
          // alert('hi');
          if (!form.$valid) {
              alert('Please fix the errors in the form');
              return;
          }
          $scope.newblog.folio = { 'folioId': $scope.foliodata.folioId };
          $scope.objBlog.setData($scope.newblog);
          $scope.newblog = $scope.objBlog.addBlog();
           $scope.foliodata.blogList.push($scope.newblog);
           $scope.showCreateForm = false;
      };
       $scope.loadBlogPost=function(param) {
         
          $scope.isBlogPost = true;
          console.log(param);
          $scope.blogPost = $scope.foliodata.blogList[0].blogPosts[param];
          $scope.blogPost.postContent = $sce.trustAsHtml($scope.blogPost.postContent);
      };
      $scope.saveBlogPost = function (form) {
          //$scope.newBlogData = $scope.newblog.title + ":" + $scope.newblog.description;
         if (!form.$valid) {
             alert('Please fix the errors in the form');
             return;
         }
         $scope.newblog = $scope.foliodata.blogList[0];        
         $scope.objBlog.setData($scope.newblogpost);
         $scope.newblogpost = $scope.objBlog.addBlogPost($scope.newblog.blogId);
         $scope.foliodata.blogList[0].blogPosts.push($scope.newblogpost);
         $scope.showCreateBlogPost = false;
         console.log($scope.foliodata.blogList);
         
      };
      /// blog operations end
      
      $scope.fillForm=function()
      {
			  $scope.foliodata.description='Description';
		      $scope.foliodata.expectedReturn=10;
              $scope.foliodata.visibility='Public';
              $scope.foliodata.minInvestment=1;
              $scope.foliodata.investmentPct='50';
              $scope.foliodata.investmentTerm=2;
              
		  
	  }
   
  });
