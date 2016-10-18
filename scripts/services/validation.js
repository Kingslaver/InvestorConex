'use strict';


angular.module('afwebappApp').directive('isavailable', function ($q, $timeout, FolioFactory) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
           
                  
            ctrl.$asyncValidators.isavailable = function (modelValue, viewValue) {

				   var obj = new FolioFactory();

                    return obj.isFolioNameAvailable(modelValue, true)
                    .then(function (data) {

                        var def = $q.defer();

                        $timeout(function () {
                            // Mock a delayed response
                            if (data.data.folioValid == 'Yes') {
                                // The username is available
                                def.resolve();
                            } else {
                                def.reject();
                            }

                        }, 2000);

                        return def.promise;


                    });



                


            }
        }
        //}
    };
});


angular.module('afwebappApp').directive('isusernameavailable', function ($q, $timeout, UserFactory) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.isusernameavailable = function (modelValue, viewValue) {
			
				 if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }
				return UserFactory.isUserNameAvailable(modelValue, true)
                    .then(function (data) {
                        console.log(data);
                        var def = $q.defer();
                        $timeout(function () {
                            // Mock a delayed response
                            if (data.data.isUserNameAvailable == 'Yes') {
                                // The username is available
                                def.resolve();
                            } else {
                                def.reject();
                            }
                        }, 1000);
                        return def.promise;
						});
            }
        }
        //}
    };
});

angular.module('afwebappApp').directive('isemailaddressalreadyregistered', function ($q, $timeout, UserFactory) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.isemailaddressalreadyregistered = function (modelValue, viewValue) {
		
				 if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }
				return UserFactory.isEmailAddressAlreadyRegistered(modelValue, true)
                    .then(function (data) {
                        console.log(data);
                        var def = $q.defer();
                        $timeout(function () {
                            // Mock a delayed response
                            if (data.data.isEmailAddressAlreadyRegistered == 'Yes') {
                                // The username is available
                                def.reject();
                            } else {
                                def.resolve();
                            }
                        }, 1000);
                        return def.promise;
						});
            }
        }
        //}
    };
});


angular.module('afwebappApp').directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function(){
                        scope.$apply(function(){
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);
        
angular.module('afwebappApp').directive('ngAutocomplete', function($parse) {
    return {

      scope: {
        details: '=',
        ngAutocomplete: '=',
        options: '='
      },

      link: function(scope, element, attrs, model) {

        //options for autocomplete
        var opts

        //convert options provided to opts
        var initOpts = function() {
          opts = {}
          if (scope.options) {
            if (scope.options.types) {
              opts.types = []
              opts.types.push(scope.options.types)
            }
            if (scope.options.bounds) {
              opts.bounds = scope.options.bounds
            }
            if (scope.options.country) {
              opts.componentRestrictions = {
                country: scope.options.country
              }
            }
          }
        }
        initOpts()

        //create new autocomplete
        //reinitializes on every change of the options provided
        var newAutocomplete = function() {
          scope.gPlace = new google.maps.places.Autocomplete(element[0], opts);
          google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
            scope.$apply(function() {
//              if (scope.details) {
                scope.details = scope.gPlace.getPlace();
//              }
              scope.ngAutocomplete = element.val();
            });
          })
        }
        newAutocomplete()

        //watch options provided to directive
        scope.watchOptions = function () {
          return scope.options
        };
        scope.$watch(scope.watchOptions, function () {
          initOpts()
          newAutocomplete()
          element[0].value = '';
          scope.ngAutocomplete = element.val();
        }, true);
      }
    };
  });
  

angular.module('afwebappApp').directive('validPasswordC', function() {
  return {
    require: 'ngModel',
    scope: {

      reference: '=validPasswordC'

    },
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue, $scope) {
		 // console.log(viewValue);
		 // console.log(scope.reference);

        var noMatch = viewValue != scope.reference
        ctrl.$setValidity('noMatch', !noMatch);
        return (noMatch)?noMatch:undefined;
      });

      scope.$watch("reference", function(value) {;
        ctrl.$setValidity('noMatch', value === ctrl.$viewValue);

      });
    }
  }
});

