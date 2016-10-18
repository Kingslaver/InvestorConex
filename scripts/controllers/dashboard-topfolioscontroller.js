'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:FoliosCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('DashboardTopFoliosCtrl', function ($scope,FolioFactory)
  {
      $scope.obj = new FolioFactory();
	/* getFolios will be called once controller is initialized. call factory
	and store it locally*/
	$scope.pageNumber=0;
	
	

	 $scope.getTopFoliosPartial=function(pageNumber) {
		 console.log("pageNumber"+pageNumber);
		 console.log($scope.totalPages);
		// alert(pageNumber);
		 $scope.pageNumber=pageNumber;
			$scope.obj.getTopFoliosPartial(pageNumber)
				.success(function (topFolios) {
					$scope.totalPages=0;
					console.log(topFolios);
					
					
					for(var i=0;i<topFolios.length;i++)
					{
						if(topFolios[i].image===null)
						{
							//console.log('image is null');
							//topFolios[i].image='http://placehold.it/50x50';
							topFolios[i].image='images/img_placeholder.jpg';
						}
					}
					$scope.topFolios = topFolios;
					$scope.totalPages=$scope.topFolios[0].totalPages;
					
					
				})
				.error(function (error) {
					$scope.status = 'Unable to load topFolios data: ' + error.message;
				});
	    }
	   
	   
	$scope.getTopFoliosPartial($scope.pageNumber);
	
	$scope.getNumber = function(num) {
			return new Array(num);   
		};
		
	
   }		
  );
