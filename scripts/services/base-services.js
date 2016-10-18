'use strict';

/**
 * @ngdoc service
 * @name afwebappApp.BaseFactory
 * @description
 * # BaseFactory
 * Service in the afwebappApp.
 */
 
angular.module('afwebappApp').factory('BaseFactory', ['$http','$q',
function ($http, $q) {
    var BaseFactory = {};
    BaseFactory.getData = function (url) {
        var deferred = $q.defer();
       return $http.get(url).success(function (res) {
           deferred.resolve(res);
           
       }).error(function () {
           deferred.reject();
       });
        return deferred.promise;       
       
    }

    BaseFactory.postData = function (url, obj) {
        var deferred = $q.defer();
        return $http.post(url,obj).success(function (res) {
            deferred.resolve(res);

        }).error(function () {
            deferred.reject();
        });
        return deferred.promise;

    }
    return BaseFactory;
}
]);