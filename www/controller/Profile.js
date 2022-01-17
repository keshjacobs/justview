app.controller('profile', function($cordovaSocialSharing,$stateParams,$timeout,Upload,$scope,$state,account,$ionicPopup,$rootScope) {
  







  $rootScope.$emit('lazyImg:refresh');

  $rootScope.profile={};


if($stateParams.id){
  var id=$stateParams.id;
    $rootScope.fetch_profile(id);
}else{
  if($rootScope.user){
  $rootScope.refresh_profile();
  }
}
  
  $scope.file_up=function(f) {
  $rootScope.show();
  $rootScope.file=f;
  $timeout(function(){
      $rootScope.hide();
  },3000);
};




$rootScope.update_photo=function(){
  if($rootScope.user){
  if($rootScope.file){
      var uploadUrl = API + "upload_photo";
      var post={
        t_id:$rootScope.user.t_id
      };
      post.file=$rootScope.file;
      $rootScope.show();
      Upload.upload({
        url: uploadUrl,
        data: post
      }).then(function(resp) {
        var msg=resp.data.message;
        $rootScope.hide();
        $ionicPopup.alert({template:msg});
        if(resp.data.status==true){
            $rootScope.refresh_profile();
            $rootScope.file=null;
            window.history.back();
        }
      });
  }else{
    window.history.back();
  }
}
};


    


    $scope.open_link=function(link){
      window.open(link, '_system', 'location=yes');
    };
    



    $rootScope.profile_update=function(profile){
      $rootScope.account_update(profile);
      window.history.back();
    }
    
    
    




$scope.share_link = function (user) {
  var n=user.first_name + user.last_name;
  var m="";
  var l=API+n;
  $cordovaSocialSharing.share(m,null,null,l);
};





$rootScope.change_password=function(data){
  data.t_id=$rootScope.user.t_id;
  account.change_password(data).success(function(Data){
    $rootScope.hide();
    $ionicPopup.alert({
      template: Data.message
    });
    if(Data.status==true){
        $state.go("front.talk");
    }
       }).error(function(){
        $rootScope.hide();
        $ionicPopup.alert({
          template: "network error."
        });
       });    
};




$rootScope.new_password=function(n){
  data={
    t_id:$rootScope.user.t_id,
    new_password:n
  };
  account.new_password(data).success(function(Data){
    $rootScope.hide();
    $ionicPopup.alert({
      template: Data.message
    });
    if(Data.status==true){
        $state.go("front.talk");
    }
       }).error(function(){
        $rootScope.hide();
        $ionicPopup.alert({
          template: "network error."
        });
       });    
};


 





$rootScope.logout=function(){
  $ionicPopup.show({
    template: 'Are you sure you want to logout?',
    title: 'Sign out of account',
    scope: $rootScope,
    buttons: [
      {
      text: 'Cancel' ,
      type:"button-light"
      },
      {
      text: '<b>Logout</b>',
      type: 'button-assertive',
      onTap: function(e) {    
        $timeout(function(){
        $rootScope.remove_account();
        },1000);
      }
    }
    ]
    });
  };
  
  
  

});
  
  
  
  