'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:AdvisoryCtrl
 * @description
 * # AdvisoryCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('AdvisoryIdCtrl', function ($scope,$http,$state,$stateParams,$routeParams,AdvisoryFactory,ModalService)
  {
      
	function getAdvisor() {
			AdvisoryFactory.getAdvisor($stateParams.advisoryId)
			    .success(function (advisor) {
				$scope.advisorData = advisor;
				console.log('priting advsory response now');
				console.log(advisor);
			
			    })
			    .error(function (error) {
				$scope.status = 'Unable to load advisor data: ' + error.message;
			    });
		    }

		getAdvisor();

	$scope.done = function () {
		
                    // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                    $state.go('advisory', $stateParams);
                  };

	$scope.contactAdvisor = function() {
		ModalService.showModal({
		    templateUrl: 'AdvisorContactInformation.html',
		    controller: 'ModalController',
		inputs: {
		   phoneNumber:''
		  
		}
		}).then(function(modal) {
		    modal.element.modal();
		    modal.close.then(function(result) {
		        //$scope.message = 'You said ' + result;
		    console.log(result);
			if(result==='Yes')
			{
				console.log('contacting advisory now');
				AdvisoryFactory.contactAdvisor($scope.advisorData).success(function(response){
					console.log(response);
					$scope.advisorData = response;
				});
			}
		
		    });
		});
	    };


	

   }		
  );
