'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.FolioService
 * @description
 * # FolioService
 * Service in the afwebappApp.
 */
var traderService = angular.module('traderService', ['ngResource']);

traderService.factory('TraderFactory', ['$http','CommonUrlFactory','FolioFactory',
  function($http,CommonUrlFactory){
	
	//var urlBase = '/api/trader/';
	var urlBase=CommonUrlFactory.getTraderServiceUrl();
	var TraderFactory={};
	
	TraderFactory.submitTrades=function(folio)
	{
		console.log('submitTrades'+urlBase);
		return $http.post(urlBase, folio);
	};
	
	TraderFactory.submitTradesStandAlone=function(folio)
	{
		console.log('submitTradesStandAlone'+urlBase);
		return $http.post(urlBase + '/submitTradesStandAlone', folio);
	};
	
	TraderFactory.getTrades = function () {
		//console.log('TraderFactory getTrades');
        return $http.get(urlBase);
    	};

    TraderFactory.getFolio = function (id) {
		return $http.get(urlBase + '/' + id);
		
	    };

	    TraderFactory.searchFolio = function (folio) {
		return $http.post(urlBase + '/search',folio);
	    };


	    TraderFactory.addFolio = function (folio) {
		return $http.post(urlBase, folio);
	    };

	    TraderFactory.updateFolio = function (cust) {
		return $http.put(urlBase + '/' + cust.ID, cust);
	    };

	    TraderFactory.deleteFolio = function (id) {
		return $http.delete(urlBase + '/' + id);
	    };

   

    return TraderFactory;

    
  }]);

