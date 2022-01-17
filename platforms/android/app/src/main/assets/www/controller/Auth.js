app.controller('Auth', function($scope,$state,$http,account,$ionicPopup,$rootScope,$localStorage) {

var ip=null;
$rootScope.det={};

  $http.get("https://ipinfo.io/json").then(function (response) 
  {
    ip = response.data.ip;
  });



  
    $rootScope.login=function (data) {
      $rootScope.show();
      data.pushtoken=$rootScope.pushtoken;
     if(!data.password){
        $ionicPopup.alert({
       template: "Please provide your password."
     });
    }else{
        data.ip=ip;
      account.login(data).success(function(Data){
        $rootScope.hide();
        if(Data.status==true){
          $localStorage.t_id=Data.data.t_id;
          $rootScope.t_id=Data.data.t_id;
          $rootScope.user=Data.data;
          $state.go("front.dashboard");
          $rootScope.det={};
        }else{
        $scope.error=Data.message;
        }
      }).error(function(data){
        $rootScope.hide();
        $scope.error="OOPS! , CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.";
      });
    }
     
    };
  
  





  
  

    });
  
  
  
  
  
  