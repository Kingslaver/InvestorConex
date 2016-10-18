'use strict';

/**
 * @ngdoc overview
 * @name afwebappApp
 * @description
 * # afwebappApp
 *
 * Main module of the application.
 */
var afwebappApp=angular
  .module('afwebappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'commonUrlServices',
    'angularModalService',
    'userService',
    'advisoryServices',
    'googleServices',
    'UtilityServices',
    'traderService',
    'angular-loading-bar', 
    'ngAnimate',
   'textAngular',
   'chart.js',
   'ui.slider',
   'angucomplete',
   'angularGrid',
   'vcRecaptcha',
   'ngMaterial'
   
   
    
  ]) 
  .config(function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider.when('/messageCenter', '/messageCenter/messages').otherwise('/');
      
      $stateProvider.state('/', {

		url: '/',
		templateUrl: 'views/main.html',
       	controller: 'MainCtrl'

	});
       $stateProvider.state('login', {

		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl'

	});
	  $stateProvider.state('signup', {

		url: '/signup',
		templateUrl: 'views/signup.html',
		controller: 'LoginCtrl'

	});
	  $stateProvider.state('admincsv', {

		url: '/admincsv',
		templateUrl: 'views/csv.html',
       		controller: 'CsvCtrl'

	});
	 $stateProvider.state('adminfolioimport', {

		url: '/adminfolioimport',
		templateUrl: 'views/folioimport.html',
       	controller: 'CsvCtrl'

	});
	$stateProvider.state('adminimageapprove', {

		url: '/adminimageapprove',
		templateUrl: 'views/adminimageapprove.html',
       	controller: 'AdminCtrl'

	});
	$stateProvider.state('adminusercontrol', {

		url: '/adminusercontrol',
		templateUrl: 'views/adminusercontrol.html',
       	controller: 'AdminCtrl'

	});
	 $stateProvider.state('adminbsecsv', {

		url: '/adminbsecsv',
		templateUrl: 'views/bsecsv.html',
       		controller: 'CsvCtrl'

	});
	
	$stateProvider.state('userpage',{
		url:'/users/:userName',
		templateUrl:'views/userpage.html',
		controller: 'UserPageCtrl'
	});
	
	$stateProvider.state('userbasic', {

		url: '/user/userbasic',
		templateUrl: 'views/userbasic.html',
       	controller: 'UserCtrl'

	}).
	state('userinvestmentprofile', {

		url: '/user/investmentprofile',
		templateUrl: 'views/userinvestmentprofile.html',
       	controller: 'UserCtrl'

	}).
	state('usertradeprofile', {

		url: '/user/tradeprofile',
		templateUrl: 'views/tradeprofile.html',
       	controller: 'UserCtrl'

	}).
	state('userconnections', {

		url: '/user/userconnections',
		templateUrl: 'views/userconnections.html',
       	controller: 'UserConnectionsCtrl'

	}).
	state('usercircle', {

		url: '/user/usercircle',
		templateUrl: 'views/usercircledetails.html',
       	controller: 'MyCircleDetailsCtrl'

	}).
	state('usercircleedit', {

		url: '/user/usercircle/edit/:myCircleId',
		templateUrl: 'views/usercircleedit.html',
       	controller: 'MyCircleEditCtrl'

	}).
	state('usercirclenew', {

		url: '/user/usercircle/new/',
		templateUrl: 'views/usercirclenew.html',
       	controller: 'MyCircleEditCtrl'

	});
	$stateProvider.state('dashboard', {
        url: '/dashboard',
        views: {

            // the main template will be placed here (relatively named)
            '': { templateUrl: 'views/dashboard-partial.html' },

            // the child views will be defined here (absolutely named)
            'myFolios@dashboard': { 
                templateUrl: 'views/dashboard-myfolios.html',
                controller: 'DashboardCtrl'
            },

            // for column two, we'll define a separate controller 
            'trendingFolios@dashboard': { 
                templateUrl: 'views/trending-folios.html',
                controller: 'DashboardTrendingFoliosCtrl'
            },
             // for column two, we'll define a separate controller 
            'topFolios@dashboard': { 
                templateUrl: 'views/top-folios.html',
                controller: 'DashboardTopFoliosCtrl'
            },
            
            'recommendedFolios@dashboard': { 
                templateUrl: 'views/recommmended-folios-list.html',
                controller: 'DashboardRecommFoliosCtrl'
            },
            'latestPosts@dashboard': { 
                templateUrl: 'views/blogposts-list.html',
                controller: 'DashboardBlogCtrl'
            },
            'anlalystRecommendations@dashboard': { 
                templateUrl: 'views/dasbhboard-analyst-recommendations.html',
                controller: 'DashboardAnalystRecommCtrl'
            }
            
        }
        
    });
	
	
	$stateProvider.state('trades', {

		url: '/trades',
		abstract: false,
		templateUrl: 'views/trades-new.html',
		controller: 'TradesNewCtrl'
		
	})
	.state('trades.list', {

		url: '/trades',
		abstract: false,
		templateUrl: 'views/trades-list.html',
		controller: 'TradesListCtrl'
		
	})
	.state('advisory', {

		url: '/advisory',
		abstract: false,
		templateUrl: 'views/advisory-search.html',
		controller: 'AdvisoryCtrl'
		
	})
	.state('advisorydetails', {
		url:'/advisory/details/:advisoryId',
		templateUrl: 'views/advisory-details.html',
		controller:'AdvisoryIdCtrl'
					
         
		})	
 	.state('folios', {
		url: '/folios',
		templateUrl: 'views/folios.html',
		controller:'FoliosListCtrl'
		})
	.state('foliosnew', {

		url: '/folios/new',
		templateUrl: 'views/folios-new.html',
		controller:'FoliosNewCtrl'
		})
	.state('folioedit', {
		url:'/folios/:folioId/edit',
		templateUrl: 'views/folios-edit.html',
		controller:'FoliosNewCtrl'
		})
	.state('foliosearch', {
		url: '/folios/search',
		templateUrl: 'views/folios-search.html',
		controller:'FoliosSearchCtrl'
		})
	.state('foliodetails', {

		url:'/folios/:folioId',
		templateUrl: 'views/folios-details.html',
		controller:'FolioDetailsCtrl'
		})
	.state('folioreturns', {
		url:'/folios/:folioId/returns/:stockId',
		templateUrl: 'views/folios-stockreturns.html',
		controller:'FolioStockReturnsCtrl'
		})
	.state('searchanalystrecommendations',{
		url:'/analystrecommendations',
		templateUrl: 'views/analystrecommendations.html',
		controller:'DashboardAnalystRecommCtrl'
		})

	$stateProvider
      .state('messageCenter', {
          url: '/messageCenter',
          params: {
              autoActivateChild: 'messages'
          },
          views: {

              // the main template will be placed here (relatively named)
              '': {
                  templateUrl: 'views/messageCenter/main.html',

              },

              // the child views will be defined here (absolutely named)
              'myFriendSearch@messageCenter': {
                  templateUrl: 'views/messageCenter/_friendSearch.html',
                  controller: 'MessageCenterCtrl'
              }
          }

      }).state('messageCenter.messages', {
          url: '/messages',
          templateUrl: 'views/messageCenter/_messages.html',
          controller: 'MessageCenterCtrl'
      }).state('messageCenter.messageCompose', {
          url: '/messageCompose',
          templateUrl: 'views/messageCenter/_compose.html',
          controller: 'MessageCenterCtrl'
      }).state('messageCenter.detailedMessage', {
          url: '/detailedMessage/:messageId',
          templateUrl: 'views/messageCenter/_detailedMessage.html',
          controller: 'MessageCenterCtrl'
      });

	
       
  })
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: true
    });
    
  }]);
  
  afwebappApp.run(function ($rootScope,$state,$location,UserFactory) {
	  
	   $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState , fromParams) {
		  console.log(toState);
		  console.log(toParams);
		  console.log(UserFactory.authenticated);
		  console.log(UserFactory.loggedInUser);
		  
		  if(toState.url == '/login'){
			  return;
		  }
		  var previousUrl=toState.url;
		  $.each(toParams, function(k, v) {
				k=":"+k;
				previousUrl=previousUrl.replace(k,v);
			});
			
		  if(!UserFactory.loggedInUser)
		  {
			  console.log('user not logged in yet');
			  UserFactory.getUser(previousUrl).success(function(data)
			  {
				  console.log('got back from service');
				  console.log(data);
				  if(data)
				  {
					  console.log('authentictd true. setting loggedInuser');
					  UserFactory.authenticated=true;
					  UserFactory.loggedInUser=angular.copy(data);
					  $rootScope.authenticated=true;
					  $rootScope.loggedInUser=angular.copy(data);
					  if( toState.name != 'userbasic' && ( UserFactory.loggedInUser.userName==='' ||
															!UserFactory.loggedInUser.userName ||
															UserFactory.loggedInUser.userName.length==0
													 		))
					   {
						   console.log('user name is empty');
						   event.preventDefault();
						   $state.go('userbasic');
					   }
					 
					  if(toState.url == '/'){
						$rootScope.hideMenu=true;
					  }
					  else{
						  $rootScope.hideMenu=false;
					  }
				  
				  }
				  else
				  {
					  console.log('authentictd false. setting loggedInuser null');
					  UserFactory.authenticated=false;
					  UserFactory.loggedInUser=null;
					  $rootScope.authenticated=false;
					  $rootScope.loggedInUser=null;
					  if(toState.url != '/' && toState.url != '/signup'){
						  event.preventDefault();
						  $state.go('login');
					  }
				  }
				  
			   });
			  // console.log('after getuser');
			
		   }
		   if(UserFactory.loggedInUser)
		   {
			   console.log('user has logged in');
			   console.log(UserFactory.loggedInUser.userName);
			   console.log(toState);
			   console.log(fromState);
			   if( toState.name != 'userbasic' && ( UserFactory.loggedInUser.userName==='' ||
															!UserFactory.loggedInUser.userName ||
															UserFactory.loggedInUser.userName===null || 
															UserFactory.loggedInUser.userName.length==0
													 		))
			   {
				   console.log('user name is empty');
				   event.preventDefault();
				   $state.go('userbasic');
			   }
			   $rootScope.hideMenu=false;
			   
			   
		   }
	   
	  
    
  });
	  
	 

});
