'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('DashboardRecommFoliosCtrl', function ($scope,FolioFactory)
  {
      $scope.obj = new FolioFactory();
	/* getFolios will be called once controller is initialized. call factory
	and store it locally*/

	 function getRecommendedFoliosPartial() {
			$scope.obj.getRecommendedFoliosPartial()
				.success(function (recommendedFolios) {
					
					for(var i=0;i<recommendedFolios.length;i++)
					{
						if(recommendedFolios[i].image===null)
						{
							//console.log('image is null');
							//recommendedFolios[i].image='http://placehold.it/50x50';
							recommendedFolios[i].image='images/img_placeholder.jpg';
						}
					}
					$scope.recommendedFolios = recommendedFolios;
					console.log(recommendedFolios);
					
				})
				.error(function (error) {
					$scope.status = 'Unable to load recommendedFolios data: ' + error.message;
				});
	    }
	   
	   
	getRecommendedFoliosPartial();
	

	

	
   }		
  );
