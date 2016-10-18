'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.FolioService
 * @description
 * # FolioService
 * Service in the afwebappApp.
 */
var UtilityServices = angular.module('UtilityServices', ['ngResource']);

UtilityServices.factory('UtilFactory', [function(){
	
	var UtilFactory={};
		/* sample google response 
		// [ { "id": "10428873" ,"t" : "3IINFOTECH" ,"e" : "NSE" ,"l" : "7.30" ,"l_fix" : "7.30" ,"l_cur" : "Rs.7.30" ,"s": "0" ,"ltt":"3:40PM GMT+5:30" ,"lt" : "Apr 16, 3:40PM GMT+5:30" ,"lt_dts" : "2015-04-16T15:40:20Z" ,"c" : "-0.20" ,"c_fix" : "-0.20" ,"cp" : "-2.67" ,"cp_fix" : "-2.67" ,"ccol" : "chr" ,"pcls_fix" : "7.5" } ]

		thats why we use split and take the splitted string andconvert to json */
			
		UtilFactory.convertGooglePrice = function (data) {
			var googleResult=data.stockPrice.split('//');
			var obj = JSON.parse(googleResult[1]);
			console.log(obj[0].l_fix);
			return obj[0].l_fix;
		
	    };


    return UtilFactory;

    
  }]);

