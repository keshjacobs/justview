
app.directive('backButton', function(){

  return {

    restrict: 'A',



    link: function(scope, element, attrs) {

      element.bind('click', goBack);



      function goBack() {

        history.back();

        scope.$apply();

      }

    }

  }

});
app.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});



app.directive('disabletap', function($timeout) {
  return {
    link: function() {
      $timeout(function() {
        container = document.getElementsByClassName('pac-container');
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if google-address-entry is selected
        angular.element(container).on("click", function(){
            document.getElementById('type-selector').blur();
        });

      },500);

    }
  };
});


app.directive('currencyInput',['$locale', '$filter', function($locale, $filter) {

  // For input validation
  var isValid = function(val) {
    return angular.isNumber(val) && !isNaN(val);
  };

  // Helper for creating RegExp's
  var toRegExp = function(val) {
    var escaped = val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp(escaped, 'g');
  };
val = val.replace(decimal, '').replace(group, '').replace(currency, '').trim();
  var toView = function(val) {
    return $filter('currency')(val);
  };
  var link = function($scope, $element, $attrs, $ngModel) {
    $ngModel.$formatters.push(toView);
    $ngModel.$parsers.push(toModel);
    $ngModel.$validators.currency = isValid;
    $element.on('keyup', function() {
      $ngModel.$viewValue = toView($ngModel.$modelValue);
      $ngModel.$render();
    });
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    link: link
  };
}]);


  app.service('sideMenuService', function($ionicSideMenuDelegate) {
    return {
      openSideMenu: function(menuhandle)
      {
        console.log('open menu');
        return $ionicSideMenuDelegate.$getByHandle(menuhandle).toggleRight();
      }
    };
  });

  app.service('fileUploadService', function ($http, $q) {
 
    this.uploadFileToUrl = function (file, uploadUrl) {
        //FormData, object of key/value pair for form fields and values
        var fileFormData = new FormData();
        fileFormData.append('file', file);

        var deffered = $q.defer();
        $http.post(uploadUrl, fileFormData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}

        }).success(function (response) {
            deffered.resolve(response);

        }).error(function (response) {
            deffered.reject(response);
        });

        return deffered.promise;
    };
});
