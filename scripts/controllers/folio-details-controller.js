'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('FolioDetailsCtrl', function ($scope,$sce, $http, $state, $stateParams, $routeParams, GoogleFactory, FolioFactory, UserFactory,UtilFactory, ModalService, Blog) {

      $scope.obj = new FolioFactory();
      $scope.objBlog = new Blog();
      
      
      $scope.visibilityOptions = $scope.obj.getVisibilityOptions();
      $scope.InvestmentTimelineOptions = $scope.obj.getInvestmentTimelineOptions();
      $scope.InvestmentAmountOptions = $scope.obj.getInvestmentAmountOptions();
     
      $scope.isBlogPost = false;
      $scope.showCreateBlogPost = false;
      $scope.showCreateForm = false;
      $scope.mode = 'Detail';
      $scope.showCreateForm = false;
      $scope.newblog = {};
      $scope.newblogPost = {};
      $scope.newblog.blogName = '';
      $scope.newblog.blogDescription = '';
      $scope.newblog.folioId = 0;
      $scope.newBlogData = ''; // Needs to update this data to post http 
      $scope.breadcrumbs = 'Folio Details';
      
      var path = 'assets/stocks.json';
      $http.get(path).success(function (stocks) {
          $scope.stocks = stocks;
          
      });
      
    /*  var columnDefs = [
	{headerName: "Name", field: "stock.stockName"},
	{headerName: "Name", field: "stockName"},
	{headerName: "id", field: "id"},
	];
			
	$scope.gridOptions = {
	columnDefs: columnDefs,
	rowData: null,
	dontUseScrolls: true // because so little data, no need to use scroll bars
	};*/
      
     
      getRiskAppetiteOptions();
      
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
              
              $scope.foliodata = folio;
              $scope.foliodata.currentFolioValue = 0;

              for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
                   updatePrice($scope.foliodata.folioStocks[i]);
              }

              $scope.obj.foliodata = $scope.foliodata;
              if($scope.foliodata.blogList){
				  $scope.newblog = $scope.foliodata.blogList[0];
			  }

              if($scope.newblog)
              {
				$scope.blogId = $scope.newblog.blogId;
				//$scope.foliodata.blogList[0].blogPosts = $scope.objBlog.getAllPosts($scope.newblog.blogId);
				for(var i=0;i<$scope.foliodata.blogList[0].blogPosts.length;i++){
					console.log($scope.foliodata.blogList[0].blogPosts[i]);
					//$scope.foliodata.blogList[0].blogPosts[i].newContent=$sce.trustAsHtml($scope.foliodata.blogList[0].blogPosts[i].postContent);
				}
		
			  }
			  
			  console.log($scope.foliodata);
              getFolioAssociations();
              getMyCircleOptions();
              bindMyCircle();
             /* $scope.gridOptions.rowData=$scope.foliodata.folioStocks;
              $scope.gridOptions.api.onNewRows();*/
               

          })
          .error(function (error) {
              $scope.status = 'Unable to load folio data: ' + error.message;
              console.log(error);
          });

      }

      function getFolioAssociations() {
          $scope.obj.getFolioAssociations($stateParams.folioId).success(function (folioassociations) {
              $scope.folioassociations = folioassociations;
              console.log(folioassociations);



          })
          .error(function (error) {
              $scope.status = 'Unable to load folio data: ' + error.message;
              console.log(error);
          });
      }
      
       function getMyCircleOptions(){
		UserFactory.getMyCircles().success(function(response){
			$scope.mycircleOptions=response;
			console.log($scope.mycircleOptions);
		}).error(function(error){
			alert('Error in fetching my circles');
			console.log(error);
		});
	};
	
	function  bindMyCircle(){
		$scope.foliodata.mycircle=[];
		if($scope.foliodata.folioMyCircle.length>0){
			
			for(var i=0;i<$scope.foliodata.folioMyCircle.length;i++){
				console.log($scope.foliodata.folioMyCircle[i].myCircle.myCircleId);
				$scope.foliodata.mycircle.push($scope.foliodata.folioMyCircle[i].myCircle.myCircleId);
			}
		}
		console.log($scope.foliodata.mycircle);
	};

      getFolio();
     

      $scope.followFolioVirtual = function () {
          ModalService.showModal({
              templateUrl: 'views/ConfirmFolioCharges.html',
              controller: 'ModalController',
              inputs: {
                  phoneNumber: ''

              }
          }).then(function (modal) {
              modal.element.modal();
              modal.close.then(function (result) {
                
                  console.log(result);
                  if (result === 'Yes') {
                      $scope.obj.virtualFollowFolio($scope.foliodata).success(function(folio){
						  alert('Success');
						  console.log(folio);
						  $scope.foliodata = folio;
						  getFolioAssociations();
					  })
					  .error(function(error){
						  alert('Unable to perform the requested the operation. Please try again later');
					  });
                      
                  }

              });
          });
      };

      $scope.followFolioReal = function () {
          ModalService.showModal({
              templateUrl: 'views/ConfirmRealFolioFollow.html',
              controller: 'ModalController',
              inputs: {
                  phoneNumber: ''

              }
          }).then(function (modal) {
              modal.element.modal();
              modal.close.then(function (result) {
                  
                  console.log(result);
                  if (result === 'Yes') {
                      $scope.selectedTab = 5;

                      $state.go('userhome.myfolios.details.follow', $stateParams);
                  }

              });
          });
      };


      $scope.removeStock = function (folioStock) {

          console.log('removeStock');
          console.log(folioStock);
          var index = -1;
          for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {

              if (folioStock.stock.stockSymbol === $scope.foliodata.folioStocks[i].stock.stockSymbol) {
                  index = i;
                  break;
              }
          }
          if (index !== -1) {
              
              $scope.foliodata.folioStocks.splice(index, 1);
              $scope.recalculateFolioValue();

          }

      };

      $scope.recalculateFolioValue = function () {
          console.log('recalculateFolioValue');
          console.log($scope.foliodata);
          var cost = 0;
          for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
              cost = cost + ($scope.foliodata.folioStocks[i].entryPrice * $scope.foliodata.folioStocks[i].quantity);
          }
          $scope.foliodata.cost = cost;
          console.log('after calculating');
          console.log($scope.foliodata);

      };


      $scope.showCreateBlogButton = function () {
          if ($scope.foliodata.blogList && $scope.foliodata.blogList.length > 0) {
              return false;
          }
          else {
              return true;
          }
      };

      $scope.showBlogsSection = function () {
          return true;
      };

      $scope.showEditButton = function () {
           
            if($scope.foliodata && $scope.foliodata.editable==true)
			  {
				  return true;
			  }
		  
          return false;
      };



      $scope.editClickHandler = function () {
          $state.go('folioedit', $stateParams);
      }

      $scope.showSelectStocksSection = function () {
          if ($scope.mode != 'Detail')
              return true;
          return false;

      }

      $scope.showFollowFolioVirtualButton = function () {
                    
          if($scope.mode!='Detail')
          {
			  return false;
		  }
          if($scope.folioassociations && $scope.folioassociations.Virtual==='Yes')
          {
			return false;
          }
          if($scope.foliodata && $scope.foliodata.editable==true)
          {
			  return false;
		  }
          return true;
      }

      $scope.showSaveAndExecuteButton = function () {
          return false;

      }
      
       $scope.showSaveFolioButton = function () {
		   if($scope.mode == 'Edit')
		   {
				return true;
			}
			return false;
			
      }

      $scope.resetCreateBlogForm = function () {
          $scope.showCreateForm = true;
          $scope.newBlogData = '';
          
      };

      ///blog operations starts

      $scope.saveBlog = function (form) {
          
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
          
         if (!form.$valid) {
             alert('Please fix the errors in the form');
             return;
         }
        
         $scope.newblog = $scope.foliodata.blogList[0];   
         $scope.objBlog.setData($scope.newblogpost);
         $scope.newblogpost = $scope.objBlog.addBlogPost($scope.newblog.blogId);
         $scope.foliodata.blogList[0].blogPosts.push($scope.newblogpost);
         $scope.showCreateBlogPost = false;
        
         
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
              recalculateFolioValue();


          });
      }

      function recalculateFolioValue() {
          console.log('recalculateFolioValue');
          console.log($scope.foliodata);
          var currentFolioValue = 0;
          for (var i = 0; i < $scope.foliodata.folioStocks.length; i++) {
              currentFolioValue = currentFolioValue + ($scope.foliodata.folioStocks[i].marketPrice * $scope.foliodata.folioStocks[i].quantity);
          }
          $scope.foliodata.currentFolioValue = currentFolioValue;
          console.log('after calculating');
          console.log($scope.foliodata);

      }

      $scope.done = function () {
          // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
          $state.go('^', $stateParams);
      };

      $scope.followFolio = function () {
          $scope.obj.foliodata = $scope.foliodata;
          $state.go('userhome.myfolios.details.follow', $stateParams);
      };

      $scope.refreshStockPrice = function (folioStock) {
		updatePrice(folioStock);
      };

  }
  );
