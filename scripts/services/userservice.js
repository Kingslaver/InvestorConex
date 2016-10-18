'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.userService
 * @description
 * # userService
 * Service in the afwebappApp.
 */


var userService = angular.module('userService', ['ngResource']);

userService.factory('UserFactory', ['$http','CommonUrlFactory','$rootScope',
  function($http,CommonUrlFactory,$rootScope){

	
	var urlBase=CommonUrlFactory.getUserServiceUrl();
	var loginUrl = CommonUrlFactory.getLoginServiceUrl();
	var UserFactory={};
	var loggedInUser={};
	var authenticated=false;
	
 	UserFactory.getUsers = function () {
        return $http.get(urlBase);
    	};
    	
    UserFactory.login = function () {
        return $http.get(loginUrl);
    	};

	 UserFactory.getUser = function (previousUrl) {
		return $http({
			url: urlBase + '/me', 
			method: "GET",
			params: {previousUrl: previousUrl}
		 });
		};
     
     UserFactory.getUserByName = function (userName) {
		return $http.get(urlBase + '/userName/'+userName);
     };
    
     UserFactory.isUserNameAvailable=function (userName) {
		 return $http.get(urlBase + '/isUserNameAvailable/'+userName);
	 };
	
	 UserFactory.isEmailAddressAlreadyRegistered=function (emailAddress) {
		 return $http.get(urlBase + '/isEmailAddressAlreadyRegistered?emailAddress='+emailAddress);
	 };
	
	 UserFactory.getUserByNameForAdmin = function (userName) {
		return $http.get(urlBase + '/admin/userName/'+userName);
     };
    
     UserFactory.updateUser = function (user) {
		console.log(user);
		return $http.post(urlBase + '/' + user.userId, user);
	    };
	
	UserFactory.addUser = function (user) {
		console.log(user);
		return $http.post(urlBase + '/adduser' ,  user);
	    };
	
	UserFactory.customLogin = function (user) {
		console.log(user);
		return $http.post('/api/customLogin', user);
	    };
	    
	 UserFactory.isLoggedIn=function(){
			console.log(urlBase);
			return $http.get(urlBase + '/isLoggedIn');
		};
		
	UserFactory.getMyCircles=function(){
		return $http.get(urlBase + 'mycircles');			
	};
	UserFactory.getMyFollowers=function(){
		return $http.get(urlBase + 'myfollowers');			
	};
	UserFactory.getMyFollowings=function(){
		return $http.get(urlBase + 'myfollowings');			
	};
	
	UserFactory.getAgeGroupOptions=function(){
		return $http.get(urlBase + 'agegroupoptions');			
	};
	
	UserFactory.addCircle=function(mycircle){
		return $http.post(urlBase + 'mycircles/',mycircle);			
	};
	
	UserFactory.getCircle=function(id){
		return $http.get(urlBase + 'mycircles/'+id);			
	};
		
	UserFactory.updateCircle=function(mycircle){
		return $http.put(urlBase + 'mycircles/'+ mycircle.myCircleId,mycircle);			
	};
	
	UserFactory.followUser=function(userName){
		return $http.post(urlBase + '/userName/'+userName+'/follow');		
	};
	UserFactory.unfollowUser=function(userName){
		return $http.post(urlBase + '/userName/'+userName+'/unfollow');		
	};
	
	UserFactory.updateMyFollowers=function(myFollowers){
		return $http.put(urlBase + 'myfollowers/',myFollowers);			
	};
	
	UserFactory.updateMyFollowings=function(myFollowers){
		return $http.put(urlBase + 'myfollowings/',myFollowers);			
	};
	
	
	
	return UserFactory;

    
  }]);


	

