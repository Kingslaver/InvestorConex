'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.FolioService
 * @description
 * # FolioService
 * Service in the afwebappApp.
 */
var advisoryServices = angular.module('advisoryServices', ['ngResource']);

advisoryServices.factory('AdvisoryFactory', ['$http','CommonUrlFactory',
  function($http,CommonUrlFactory){
	
	//var urlBase = '/api/advisory/';
	var urlBase=CommonUrlFactory.getAdvisoryServiceUrl();
	var AdvisoryFactory={};

 	/*AdvisoryFactory.getFolios = function () {
        return $http.get(urlBase);
    	};*/

	AdvisoryFactory.getAdvisories = function () {
        return $http.get(urlBase);
    	};



	AdvisoryFactory.getAdvisor = function (id) {
		return $http.get(urlBase + '/' + id);
	    };
	    
	AdvisoryFactory.getLocation = function(){
		return $http.get(urlBase + '/getlocations');
	    };
	    
	AdvisoryFactory.getSecurityType = function(){
		return $http.get(urlBase + '/getsecuritytype');
	    };
	  
	AdvisoryFactory.getMinimumInvestment = function(){
		return $http.get(urlBase + '/getminimuminvestment');
	    };
			

 	AdvisoryFactory.searchAdvisory = function (advisory) {
		return $http.post(urlBase + '/search',advisory);
	    };


	      
	    AdvisoryFactory.contactAdvisor = function (advisory) {
		console.log('AdvisoryFactory.contactAdvisor ');
		console.log(advisory);
		return $http.put(urlBase + '/' + advisory.advisoryId + '/contact', advisory);
	    };
	    


   

    return AdvisoryFactory;

    
  }]);

