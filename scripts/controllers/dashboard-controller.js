'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('DashboardCtrl', function ($scope,FolioFactory)
  {
      $scope.obj = new FolioFactory();
	/* getFolios will be called once controller is initialized. call factory
	and store it locally*/

	function getMyFoliosPartial() {
	    $scope.obj.getMyFoliosPartial()
		    .success(function (folios) {
		        
		        for(var i=0;i<folios.length;i++)
		        {
					if(folios[i].image===null)
					{
						//console.log('image is null');
						//folios[i].image='http://placehold.it/100x100';
						folios[i].image='images/img_placeholder.jpg';
					}
				}
				$scope.myfolios = folios;
				console.log(folios);
		    })
		    .error(function (error) {
		        $scope.status = 'Unable to load folios data: ' + error.message;
		    });
	    }
	    
	
	   
	getMyFoliosPartial();
	
   }		
  );
