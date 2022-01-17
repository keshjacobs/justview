app.controller('splash', function($timeout,$state,$rootScope){
   
     $timeout(function(){
        if(!$rootScope.notify){
            if($rootScope.t_id){
        $state.go("front.dashboard");
        }else{
        $state.go("auth");
        }
    }
    },2000);


});