'use strict';

/**
 * @ngdoc function
 * @name afwebappApp.controller:MessageCenterCtrl
 * @description
 * # FoliosCtrl
 * Controller of the afwebappApp
 */
angular.module('afwebappApp')
  .controller('MessageCenterCtrl', function ($scope, $http, $state, $stateParams, $location, $routeParams, $filter, BaseFactory, AdvisoryFactory, Message, FolioFactory) {
      var url = $location.url();
      var params = $stateParams.messageId;
      $scope.breadcrumbs = "Message Center";
      $scope.msgobj = new Message();
      $scope.recipients=[];
      
      if (url.indexOf('/messageCenter/detailedMessage/') >= 0) {
          $scope.msgobj.load(params);
          
          $scope.detailedMessage = $scope.msgobj.getMessage(params);
         // console.log($scope.detailedMessage);
         
      }
      if (url == '/messageCenter/messages') {
          $scope.messages = $scope.msgobj.getAllMessages();        
      }
      
      $scope.outmessages= $scope.msgobj.getAllOutBoxMessages();
      console.log($scope.outmessages);


       BaseFactory.getData('/api/users/all').success(function (data) {
          $scope.users= data;

      });

     
       BaseFactory.getData('/api/users/myfollowers').success(function (data) {
           $scope.myfollowers = data;

      });
      

      $scope.addSelectedUser = function (isValid) {
	 	  
		  for(var i=0;i<$scope.users.length;i++){
			  if($scope.users[i].userId===$scope.userId){
				 
				  $scope.recipients.push(angular.copy($scope.users[i]));
			  }
		  }
		  

      };

      $scope.sendMessage = function (isValid) {
		  
          var newMessage={toUserList:[]};
          
          
          console.log($scope.recipients);
          for(var i=0;i<$scope.recipients.length;i++){
			  var toUserList={ user:{} };
			  toUserList.user=angular.copy($scope.recipients[i]);
			  newMessage.toUserList.push(toUserList);
		  }
		  newMessage.subject=$scope.message.sub;
          newMessage.body=$scope.message.message;
          console.log(newMessage);
          //return;
          $scope.msgobj.addMessage(newMessage).success(function(data){
			  console.log(data);
		  }).error(function(error){
			  console.log(error);
		  });
      };
      
      $scope.deleteMessage = function(message){
		  console.log(message);
		   $scope.msgobj.deleteMessage(message).success(function(data){
			   $scope.messages = $scope.msgobj.getAllMessages(); 
		  }).error(function(error){
			  console.log(error);
		  });
	  }


  });

