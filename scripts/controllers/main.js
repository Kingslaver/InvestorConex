'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('MainCtrl', function ($scope,$http,$rootScope,$location,CommonUrlFactory,FolioFactory,AdvisoryFactory) {
	
		var urlBase = CommonUrlFactory.getUserServiceUrl();
		$scope.obj = new FolioFactory();
		$scope.pageNumber=0;
		
		$rootScope.currentPath = $location.path();
		$rootScope.hideMenu=true;
		
	
		$scope.getTopFoliosForHomePage=function(pageNumber){
			$scope.obj.getTopFoliosForHomePage(pageNumber).success(function(data){
				$scope.pageNumber=pageNumber;
				$scope.searchResultFolios = data;
				console.log($scope.searchResultFolios[0]);//raja
				$scope.totalPages=$scope.searchResultFolios[0].totalPages;
				console.log($scope.searchResultFolios);
			}).error(function(error){
				console.log(error);
			});	
		};
		
		$scope.getTopFoliosForHomePage(0);			
			
			var advisory={showInHomePage:true};
			AdvisoryFactory.searchAdvisory(advisory).success(function (data) {
				$scope.searchResultAdvisors=data;
				console.log(data.length);
				console.log(data);
			});
		
		
		/* created by Raja for Why Us Blog */
		
			$scope.ShowWhyUsDialog = function (whyusstr) {
			    console.log('ShowWhyUsDialog');
			    $('#whyUS').hide(10);
			    $('.showlink').show();
			    $('.showimg').hide();
			    $scope.whyUsTitle = '';
			    $scope.whyUsContent = '';
			    switch (whyusstr) {
			        case '1':
			            $scope.whyUsContent = 'Folio is basically a part of your entire portfolio, which can contain up to 10 stocks. Through Folio you can track your holdings more closely. By creating folios with us, you can compete with your own investment targets and compare your success ratio with others. Your weekly ranking may fetch you lucrative prizes as well.';
			            $scope.whyUsTitle = 'Track your investments through folios';
			            
			            break;
			        case '2':
			            $scope.whyUsContent = 'We bring you the top analyst recommendations at one place. With this unique feature you can view recommendations based on a particular stock, Analyst name or for a given time period.';
			            $scope.whyUsTitle = 'View top analyst recommendations at one place';
			            
			            break;
			        case '3':
			            $scope.whyUsContent = 'We track all folios created through us and rank them based on their performances. You have an option to follow other successful folios and view the holdings inside them (as long as the creator is OK with it). Through this you can expand your investment ideas by analyzing strategies of other successful investors.';
			            $scope.whyUsTitle = 'Option to follow top earning folios';
			            
			            break;
			        case '4':
			            $scope.whyUsContent = "If you like someone to take care of your investments and give you maximum return with very minimal or no commission. Then we may have somebody just for your need nearby you. Search for a certified SEBI registered investment advisor near you and click on \"Contact me\". You will be contacted by the advisor for free, you have no obligation to connect with them if you don't like their ideas.";
			            $scope.whyUsTitle = 'Search for a financial adviser near you';
			            
			            break;
			        case '5':
			            $scope.whyUsContent = 'Using our blog and messaging feature you can directly communicate with successful investors with high ranked folios or high number of followers.';
			            $scope.whyUsTitle = 'Communicate with successful investors';
			            
			            break;
			        default:

			    }
			    //$scope.ShowDialog(title, WhyusStr);
			    $('#whyUS').show(1000);
			    $('#m'+whyusstr).hide();
			    $('#i' + whyusstr).show(1000);
			};

			$scope.ShowDialog = function (Title,str) {
			    BootstrapDialog.show({
			        title: Title,
			        message: str
			    });
			};
		
  });
