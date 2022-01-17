app.controller('Dashboard', function($localStorage,$ionicScrollDelegate,$rootScope,$timeout,Upload,$ionicModal,account,cast,$ionicPopup) {
    $rootScope.year="2022";

    $rootScope.change_year=function(year){
       $timeout(function(){
        $rootScope.year=year;
        $rootScope.fetch_data();
       },1000);
      }
   

    $rootScope.MonthCasts=function(month,year){
        var total=0;
        if($rootScope.casts){
        for(var i=0;i < $rootScope.casts.length;i++){
          var date = new Date($rootScope.casts[i].date_created);
              let m= date.getUTCMonth() + 1;
              let y= date.getUTCFullYear();
                if (m == month && y == year) {
                  var total=total+1;
                }
        }
        }
        return total;
        }
    

        $rootScope.MonthUsers=function(month,year){
            var total=0;
            if($rootScope.users){
            for(var i=0;i < $rootScope.users.length;i++){
              var date = new Date($rootScope.users[i].date_created);
                  let m= date.getUTCMonth() + 1;
                  let y= date.getUTCFullYear();
                    if (m == month && y == year) {
                      var total=total+1;
                    }
            }
            }
            return total;
            }
        



    $rootScope.fetch_data=function(){
        account.all().success(function(Data){
              if(Data.status==true){
                $rootScope.users=Data.data; 
                $rootScope.data2=[
                    $rootScope.MonthUsers(1,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(2,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(3,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(4,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(5,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(6,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(7,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(8,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(9,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(10,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(11,parseInt($rootScope.year)),  
                    $rootScope.MonthUsers(12,parseInt($rootScope.year))
                ];
        $rootScope.user_chart={
            type: 'bubble',
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          series: [$rootScope.year+" users"],
          colors: ["#FFA500"],
          data: [
            $rootScope.data2
          ]
        };   
              }else{
                console.log("could not conenct");
              }
          }).error(function(){
            console.log("could not conenct");
            $rootScope.hide();
          });  
         cast.all().success(function(Data){
              if(Data.status==true){
                $rootScope.casts=Data.data; 
                $rootScope.data1=[
                    $rootScope.MonthCasts(1,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(2,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(3,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(4,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(5,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(6,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(7,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(8,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(9,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(10,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(11,parseInt($rootScope.year)),  
                    $rootScope.MonthCasts(12,parseInt($rootScope.year))
                ];
        $rootScope.cast_chart={
            type: 'bubble',
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          series: [$rootScope.year+" casts"],
          colors: ["#FFA500"],
          data: [
            $rootScope.data1
          ]
        };   
              }
          }).error(function(){
            $rootScope.hide();
          });
 
        }
    



        $rootScope.fetch_data();


    
    
});  