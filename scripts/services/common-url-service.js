'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.FolioService
 * @description
 * # FolioService
 * Service in the afwebappApp.
 */
 
var commonUrlServices = angular.module('commonUrlServices', ['ngResource']);

commonUrlServices.factory('CommonUrlFactory', ['$http',
function($http){
	  
	
	var CommonUrlFactory={};
    //var domain='http://localhost:8080';
	//var domain='http://128.199.147.97';
	var domain='';
	
	var folioServiceUrl='/api/folios/';
	var analystUrl='/api/analystrecommendations';
	var googlePriceUrl = '/api/marketdata/';
	var advisoryServiceUrl='/api/advisory/';
	var tradeServiceUrl = '/api/trader/';
	var userServiceUrl = '/api/users/';
	var loginServiceUrl='/api/login/';
	var dummyLoginServiceUrl = '/dummylogin';
	var dummygetAllUsersUrl = '/api/users/all';
	var dummygetMyFollowersUrl = '/api/users/myfollowers';
	var dummygetMyMessagesUrl = '/api/usermessages/';
	var blogsUrl = '/api/blogs';
	
	CommonUrlFactory.getFolioUrl = function () {
       return domain+folioServiceUrl;
    };
    
    CommonUrlFactory.getGoogleUrl = function () {
       return domain+googlePriceUrl;
    };
    
    CommonUrlFactory.getUserServiceUrl = function () {
       return domain+userServiceUrl;
    };
    
    CommonUrlFactory.getAdvisoryServiceUrl = function () {
       return domain+advisoryServiceUrl;
    };
    
    CommonUrlFactory.getTraderServiceUrl = function () {
       return domain+tradeServiceUrl;
    };
    
    CommonUrlFactory.getLoginServiceUrl = function () {
       return domain+loginServiceUrl;
    };
    
    CommonUrlFactory.getDummyLoginServiceUrl = function () {
       return domain+dummyLoginServiceUrl;
    };
    
    CommonUrlFactory.getAllUsersUrl = function () {
        return domain + dummygetAllUsersUrl;
    };

    CommonUrlFactory.getMyFollowersUrl = function () {
        return domain + dummygetMyFollowersUrl;
    };

    CommonUrlFactory.getMyMessagesUrl = function () {
        return domain + dummygetMyMessagesUrl;
    };

    CommonUrlFactory.getBlogsUrl = function () {
        return domain + blogsUrl;
    };
    CommonUrlFactory.getAnalystUrl = function () {
        return domain + analystUrl;
    };
    
    
    	

    return CommonUrlFactory;

    
  }]);

