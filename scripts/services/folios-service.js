'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.FolioService
 * @description
 * # FolioService
 * Service in the afwebappApp.
 */
//var folioServices = angular.module('folioServices', ['ngResource']);

angular.module('afwebappApp').factory('FolioFactory', ['$http', 'CommonUrlFactory', 'BaseFactory',
  function ($http, CommonUrlFactory, BaseFactory) {

      function FolioFactory(data) {
          if (data) {
              this.setData(data);
          }
      };

      var urlBase = CommonUrlFactory.getFolioUrl();
      var analysturlBase = CommonUrlFactory.getAnalystUrl();
      var userUrl = CommonUrlFactory.getUserServiceUrl();
     
      var foliodata = {};

      FolioFactory.prototype = {
          setData: function (data) {
              angular.extend(this, data);
          },
          isFolioNameAvailable: function (folioname, isNotController) {
			 
              if (isNotController != undefined) {
                  return BaseFactory.getData(urlBase + 'isFolioNameValid?folioName=' + folioname);
              }
              else {
                  var List = [];
                  BaseFactory.getData(urlBase + 'isFolioNameValid?folioName=' + folioname)
                  .success(function (data) { angular.extend(List, data) });
                  return List;

              }

          },
          getMyFoliosComplete: function () {
              return $http.get(urlBase + 'myfolioscomplete');
          },
          getUserFoliosComplete: function (userId) {
              return $http.get(urlBase + 'userfolios/' +userId);
          },
          getMyFolioWatchList: function () {
              return $http.get(urlBase + 'getmyfoliowatchlist');
          },
          getMyFoliosPartial: function () {
              return $http.get(urlBase + 'myfoliospartial');
          },
          getRecommendedFoliosPartial: function () {
              return $http.get(urlBase + 'recommendedfoliospartial');
          },
          getTopFoliosPartial: function (pageNumber) {
              return $http.get(urlBase + 'topfoliospartial/'+pageNumber);
          },
          getTopAnalystRecommendations: function () {
              return $http.get(analysturlBase + '/top');
          },
          getAnalystRecommendations: function () {
              return $http.get(analysturlBase);
          },
          getAllAnalystRecommendations: function (pageNumber) {
             return $http.get(analysturlBase + '/all/'+pageNumber);
          },
          getAnalysts: function () {
              return $http.get(analysturlBase+'/analysts');
          },
          getAnalystsStocks: function () {
              return $http.get(analysturlBase+'/analystsstocks');
          },
          searchAnalyst: function (analyst) {
              return $http.post(analysturlBase + '/search', analyst);
          },
		  
          getVisibilityOptions: function () {
              var visibilityData = [
                  { 'Id': 'Public', 'Setting': 'Public', },
                  { 'Id': 'Private', 'Setting': 'Private' },
              { 'Id': 'Mycircle', 'Setting': 'Mycircle' },
              ];

              return visibilityData;
          },
          getInvestmentTimelineOptions: function () {
              var InvestmentTimelineData = [
                  { 'Id': 1, 'Value': '0-3 months', },
                  { 'Id': 2, 'Value': '3-6 months' },
                   { 'Id': 3, 'Value': '6-12 months', },
                  { 'Id': 4, 'Value': '> 1 year' },

              ];

              return InvestmentTimelineData;
          },
          getInvestmentAmountOptions: function () {
              var InvestmentAmountData = [
                 { 'Id': 1, 'Value': '< 25k', },
                  { 'Id': 2, 'Value': '25k -1 lakh' },
                   { 'Id': 3, 'Value': '1-5 lakh', },
                  { 'Id': 4, 'Value': '> 5 lakh' },

              ];

              return InvestmentAmountData;
          },
          
          getFolioTypes: function () {
              var folioTypes = [
                 { 'Id': '1', 'Value': 'Virtual Folios', }
              ];

              return folioTypes;
          },
          
          getFolioCreationRangeOptions: function () {
              var folioCreationRangeOptions = [
                 { 'Id': '1', 'Value': 'Less than 7 Days', },
                 { 'Id': '2', 'Value': '7 - 15 Days', },
                 { 'Id': '3', 'Value': 'Less than 1 Month', },
                 { 'Id': '4', 'Value': 'Less than 3 Months', }
              ];

              return folioCreationRangeOptions;
          },
          
          getRiskAppetiteOptions : function() {
			   return $http.get(urlBase + '/getRiskAppetiteOptions');
		  },
                   
          getFolio: function (id) {
              return $http.get(urlBase + '/' + id);

          },
          getFolioAssociations: function (id) {
              return $http.get(urlBase + id + '/getfolioassociations/' );

          },
          getFolioStockReturns: function (folioId,stockId) {
              return $http.get(urlBase + folioId + '/getfoliostocksreturns/' +stockId);

          },
          getTopFoliosForHomePage: function(pageNumber){
			  return $http.get(urlBase + '/gettopfoliosforhomepage/'+pageNumber);
		  },
		  getAdminUnapprovedImages: function(){
			  return $http.get(urlBase + '/admin/getunapprovedimages/');
		  },
		  
          searchFolio: function (folio) {
              return $http.post(urlBase + 'search', folio);
          },
          saveFolioAndExecute: function (folio) {
              return $http.post(urlBase, folio);
          },
          adminUpdateFolioForImagesApproval: function(myfolios){
			   return $http.post(urlBase+'/admin/adminUpdateFolioForImagesApproval', myfolios);
		   },
			  
          saveFolio: function (folio) {
			   
			  
			  // console.log(formData);
			
				var file=folio.file;
				var req = {
				 method: 'POST',
				 url: urlBase,
				 headers: { 'Content-Type': undefined },
				 data:{folio:folio},
				 transformRequest: function (data) {
					 var formData = new FormData();
					
				   formData.append("file", file);	
				   //formData.append("folio",JSON.stringify(data.folio));
				    formData.append('folio', new Blob([angular.toJson(data.folio)], {
						type: "application/json"
					}));
				   
					 console.log(data);
					  console.log(formData);
					  return formData;
					}
				};
				console.log(req);
			return $http(req);
             // return $http.post(urlBase, folio);
          },
          virtualFollowFolio: function (folio) {
              return $http.post(urlBase + 'virtualfollow', folio);
          },
          updateFolio: function (cust) {
              return $http.put(urlBase + '/' + cust.ID, cust);
          },
          deleteFolio: function (id) {
              return $http.delete(urlBase + '/' + id);
          }
      };

      return FolioFactory;


  }]);

