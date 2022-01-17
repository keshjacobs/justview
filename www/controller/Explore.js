app.controller('Explore', function($scope,$rootScope,account,cast) {
    $rootScope.query=null;



    $rootScope.search=function(key){
        account.search(key).success(function(Data){
            if(Data.status==true){
                $rootScope.user_results=Data.users;   
                $rootScope.cast_results=Data.casts;   
                $rootScope.search_results=$rootScope.cast_results.length + $rootScope.user_results.length;   
            }
        });
    }
    




    $rootScope.explore=function(){
        console.log("top casts:");
                cast.top().success(function(Data){
                    if(Data.status==true){
                        console.log("top casts:");
                        console.log(Data);
                        $rootScope.top_casts=Data.data;    
                    }
                });
    }




    });
    