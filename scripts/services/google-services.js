'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.FolioService
 * @description
 * # FolioService
 * Service in the afwebappApp.
 */
var googleServices = angular.module('googleServices', ['ngResource']);

googleServices.factory('GoogleFactory', ['$http','CommonUrlFactory',
  function($http,CommonUrlFactory){
	
	
	//var googleUrl = 'http://localhost/api/marketdata/';
	//var googleUrl = '/api/marketdata/';
	var googleUrl=CommonUrlFactory.getGoogleUrl();
	var GoogleFactory={};
	
	
	GoogleFactory.getStockLatestPrice = function (symbol,exchangeName) {
		
		console.log(exchangeName);
		if(exchangeName==='NSE'){
			var url=googleUrl + 'NSE:' + symbol;
		}
		else{
			var url=googleUrl + 'BOM:' + symbol;
		}
		
		console.log(url);
		return $http.get(url);
       
       };

    return GoogleFactory;

    
  }]);
