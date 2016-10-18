'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.Message
 * @description
 * # Messgae Model
 * Model in the afwebappApp.
 */
angular.module('afwebappApp').factory('Message', ['$http', 'CommonUrlFactory', 'BaseFactory',
  function ($http, CommonUrlFactory, BaseFactory) {
      function Message(data) {

          if (data) {
              this.setData(data);
          }
      };
      var url = CommonUrlFactory.getMyMessagesUrl(); //'http://128.199.147.97/api/users/mymessages/';
      Message.prototype = {

          setData: function (data) {
              angular.extend(this, data);
          },
          load: function (Id) {
              if (Id != undefined) {
                  var scope = this;
                  BaseFactory.getData(url + Id).success(function (data) {
                      scope.setData(data[0]);

                  });
                 
                 
              }
          },
          getMessage: function (Id) {

              var list = [];
              if (Id != undefined) {
                  BaseFactory.getData(url + Id).success(function (data) {
                      angular.extend(list, data[0]);
                      console.log(data);
                  });
              }
              return list;
          },
          addMessage: function (message) {
			  console.log(message);
			  return $http.post(url, message)
             // alert('From: ' + this.fromId + ', To: ' + this.toId + ', Sub: ' + this.sub + ', Message: ' + this.message);
          },
          deleteMessage: function (message) {
             console.log(message);
             return $http.put(url,message);
          },
          getAllMessages: function () {
			  console.log('getAllMessages');
			  console.log(url);
              var list = [];
              BaseFactory.getData(url).success(function (data) {
				  console.log(data);
                  angular.extend(list, data);

              });
              return list;
          },
           getAllOutBoxMessages: function () {
			  console.log('getAllOutBoxMessages');
			  
              var list = [];
              BaseFactory.getData(url+'/outbox').success(function (data) {
				  console.log(data);
                  angular.extend(list, data);

              });
              return list;
          }

      };



      return Message;
  }]);



