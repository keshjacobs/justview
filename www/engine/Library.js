app.run(function($ionicPlatform,$cordovaSocialSharing,$ionicActionSheet,$ionicModal,$ionicLoading,$localStorage,$timeout,$location,$rootScope,$ionicHistory,$state,$ionicScrollDelegate,account,cast,$sce,$sessionStorage,$ionicPopup){
 
  $rootScope.notify=false;
  $rootScope.home_loader=false;
  $rootScope.msg_loading=false;   
  $rootScope.casts_loading=false;
  $rootScope.timer=180;
  $rootScope.mentions=[];
      $sessionStorage.user=null;
      $localStorage.user=null;
      $rootScope.t_id=null;
      $rootScope.cast={};
      $rootScope.search_results=[];
      $rootScope.blocked=[];
      $rootScope.chat={};
      $rootScope.profile={};
      $rootScope.media=media;
      $rootScope.recording=false;
      $rootScope.messaging=false; 
       $rootScope.device={
        model:null,
        uuid:null,
        platform:null,
        serial:null
    };
    $rootScope.cast_replies=[];

  $rootScope.fetching_cast=true;
  var podcast=null;

  $rootScope.playlist=[];
  $rootScope.track=0;
  


    console.log("justalk app running....");
    


  $rootScope.file=null;

  $rootScope.file_added=false;










  $rootScope.cast_more = function(cast) {
    var buttons=[
      { text: 'Share' },
      { text: 'Report' }
   ];
   var menu={
    buttons: buttons,
    titleText: 'Cast Options',
    cancelText: 'Cancel',
    cancel: function() {
      return true;
    },
    buttonClicked: function(index) {
       if(index === 0) {
         $rootScope.share_cast(cast);
       }
       if(index === 1) {
        $rootScope.report_cast(cast);
       }
       return true;
    }
 }
 if(cast.caster.t_id==$rootScope.t_id){
  menu.destructiveText='Delete';
  menu.destructiveButtonClicked=function(){
      $rootScope.delete_cast(cast);
      return true;
  }
}
    $ionicActionSheet.show(menu);
 };












  $rootScope.cast_status= function (c) {
    if (c) {
      if (!c.expired) {
      if ($rootScope.user) {
        var user_id=$rootScope.user._id;
        var caster=null;
       if (c.caster) {
         caster=c.caster;
       }else{
        caster=c.user;
       }
       if (caster) {
        if (caster._id==user_id) {
      return 'button-balanced';
     }else{
      if (c.listens)  {
      var y=c.listens.findIndex(function(l){
        return l==user_id;
      });
      if(c.listens[y]){
        return 'played_cast';
      }else{
        return 'unplayed_cast';
      } 
    }else{
        return 'unplayed_cast';
      }
    }
  }else{
      return 'button-oran';
    }
  }else{
    return 'played_cast';
  } 
  }else{
    return 'expired_cast';
  }
}
};
 


$rootScope.play_status= function (c) {
  if (c) {
      if ($rootScope.user) {
      var user_id=$rootScope.user._id;
      var caster=null;
     if (c.caster) {
       caster=c.caster;
     }else{
      caster=c.user;
     }
     if (caster) {
      if (caster._id==user_id) {
      return 'button-balanced';
     }else{
     if (c.listens) {
            var y=c.listens.findIndex(function(l){
              return l==user_id;
            });
            if(c.listens[y]){
              return 'button-balanced';
            }else{
              return 'button-oran';
            }
        }else{
          return 'button-oran';
        }
      }
    }else{
      return 'button-oran';
    }
    }else{
      return 'button-balanced';
    }
    }else{
      return 'button-oran';
    }
};





$rootScope.has_played= function (c) {
  if (c) {
    if ($rootScope.user) {
      var user_id=$rootScope.user._id || 0;
      if (c.caster) {
        if (c.caster._id==user_id) {
      if (c.played) {
        return false;
      }else{
        return false;
      }
  } else if (c.listens) {
    var y=c.listens.findIndex(function(l){
      return l==user_id;
    });
    if(c.listens[y]){
      return false;
    }else{
      return true;
    }
  } else{
      return true;
  }
}else{
  return false;
} 
}else{
  return false;
} 
}else{
  return false;
}
};





   
  $rootScope.show=function() {
    $ionicLoading.show({
      templateUrl: 'components/loading.html'
    });
  };
   
   $rootScope.hide=function(){
    $rootScope.$broadcast('scroll.refreshComplete');
     $ionicLoading.hide();
   };
   
  
  
   
  $ionicModal.fromTemplateUrl('pop-ups/air_cast.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.aircast_box = modal;
  });
  
          

  $ionicModal.fromTemplateUrl('pop-ups/search.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.search_box = modal;
  });
  


$rootScope.remove_account=function(){  
      $timeout(function(){
        $rootScope.user=null;
        $localStorage.t_id=null;
        $rootScope.t_id=null;
        $localStorage.chats=null;
        $localStorage.user=null;
        $rootScope.chats=null;
        $rootScope.user=null;
        $state.go("auth"); 
      },1000);
  };
  
  

  

$rootScope.refresh_profile=function(){
  if($localStorage.t_id){
  var id=$localStorage.t_id;
  $rootScope.t_id=id;
  $rootScope.fetching_casts=true;
  $timeout(function(){
  account.info(id).success(function(Data){
    $rootScope.hide();
      if(Data.status==true){
        $rootScope.user=Data.data;
        console.log(Data.data);
      }else{
        console.log("could not conenct");
      }
  }).error(function(){
    $rootScope.fetching_casts=false;
    console.log("could not conenct");
    $rootScope.hide();
  });
},2000);
}
};







  $rootScope.refresh_profile();
    





$rootScope.open_cast=function(cast){
  $rootScope.cast_replies=[];
  $timeout(function(){
    $rootScope.search_box.hide();
  $rootScope.cast=cast;
  $rootScope.get_replies(cast._id);
    $state.go("cast");
  },1000);
}



$rootScope.sink=function(){
  $timeout(function(){
    $ionicScrollDelegate.scrollBottom();
  },500);
}
    
 
        
  $rootScope.block_user=function(user){
    $rootScope.blocked=[];
    $rootScope.blocked.push(user.t_id);
    if($rootScope.t_id){
      var data={
        t_id:user.t_id,
        blocker:$rootScope.t_id
      }
      account.block(data).success(function(Data){
        if(Data.status==true){
          $rootScope.refresh_profile();
        }else{
         $rootScope.hide();
        }
    }).error(function(){
         $rootScope.hide();
    });
  }
  }



        
  $rootScope.unblock_user=function(user){
    $rootScope.blocked.splice($rootScope.blocked.indexOf(user.t_id),1);
    if($rootScope.t_id){
      var data={
        t_id:user.t_id,
        blocker:$rootScope.t_id
      }
      account.unblock(data).success(function(Data){
        if(Data.status==true){
          $rootScope.refresh_profile();
        }else{
         $rootScope.hide();
        }
    }).error(function(){
         $rootScope.hide();
    });
  }
  }

    
   






    
  $rootScope.open_aircast=function(){
    $rootScope.aircast_box.show();
    }

    



    
  $rootScope.drop_aircast=function(){
    $rootScope.aircast_box.hide();
    $rootScope.current_cast=null; 
    $rootScope.playlist=null;
    }



    

 
    $rootScope.close_aircast=function(){
      $rootScope.aircast_box.hide();
      }



      $rootScope.pause_cast=function(){
        var casts=$rootScope.timeline || $rootScope.suggested_casts  || $rootScope.profile.casts || $rootScope.cast.replies || $rootScope.my_casts;
        if(casts){
        for(var i=0;i < casts.length;i++){
          if(casts[i].casting){
            casts[i].casting=false;
            break;
          }
        }
      }
      if($rootScope.cast){
            $rootScope.cast.casting=false;
      }
      if($rootScope.post){
        $rootScope.post.casting=false;
        if($rootScope.post.cast){
            $rootScope.post.cast.casting=false;
        }
      }
      if($rootScope.current_cast){
            $rootScope.current_cast.casting=false;
      }
        if(this.cast){
          this.cast.casting=false;
        }else
        if(this.cast.recast){
        this.cast.recast.casting=false;
      }
        if(this.post){
          if(this.post.cast){
          this.post.cast.casting=false;
        }
      }
      if (podcast != undefined || podcast != null) {
        $timeout(function(){
          podcast.pause();
          podcast=null;
        },0);
      }
    }



    
    $rootScope.clear=function(){
          console.log("clearing...");
          if (podcast != undefined || podcast != null) {
            $timeout(function(){
              podcast.pause();
              podcast=null;
            },0);
          }
          $timeout(function(){
            $rootScope.file=null;
            $rootScope.messaging=false;
            $rootScope.post.file=null;
          console.log($rootScope.file);
          },1000);
          $rootScope.messaging=false;
          $rootScope.file=null;
          $rootScope.file_added=false;
          $rootScope.mentions=[];
    }
         
            
    


$rootScope.count_down=function(){
  if($rootScope.recording){
  $rootScope.timer=$rootScope.timer-1;
    $timeout(function(){
      $rootScope.count_down();
    },1000);
}
}





$rootScope.report_cast = function (c) {
  var m="i would like to report this cast as insensitive or wrong by @"+c.caster.user_name+", this cast has some damage or harmful contents";
  var s="Report cast";
  var l="https://justtalkapp.com/cast/"+c._id;
  $cordovaSocialSharing.shareViaEmail(m,s,['keshjacobsltd@gmail.com'],l);
};
  




  $rootScope.next_cast=function(){
    console.log("next cast....");
    $rootScope.pause_cast();
    $timeout(function(){
      if(podcast){
        podcast.currentTime=0;
      }
    $rootScope.track=$rootScope.track+1; 
    $rootScope.current_cast={};
    if($rootScope.playlist[$rootScope.track]){
    if($rootScope.track <= ($rootScope.playlist.length-1)){
        $rootScope.play_cast($rootScope.playlist[$rootScope.track]);
          }
}
},1000);
      }










 $rootScope.profile_more = function(profile) {
   var block_button={ text: 'Block @'+profile.user_name };
    if($rootScope.is_blocked(profile)){
      block_button={ text: 'Unblock @'+profile.user_name };
    }
  var buttons=[block_button];
 var menu={
  buttons: buttons,
  titleText: 'Profile Options',
  cancelText: 'Cancel',
  cancel: function() {
  },
  buttonClicked: function(index) {
     if(index === 0) {
      if($rootScope.is_blocked(profile)){
        $rootScope.unblock_user(profile);
      }else{
        $rootScope.block_user(profile);
      }
     }
     if(index === 1) {
      $rootScope.message_user(profile);
     }
     return true;
  }
}
if($rootScope.subscribed(profile)){
  var blocks=[];
  if(profile.block_list){
    blocks=profile.block_list;
  }
if((!$rootScope.is_blocked(profile) && blocks.indexOf($rootScope.t_id)==-1)){
  buttons.push({ text: 'Send a message' });
}
}
  $ionicActionSheet.show(menu);
};






  
  
  
      $rootScope.previous_cast=function(){
        console.log("previous cast....");
        $rootScope.pause_cast();
        $timeout(function(){
          if(podcast){
            podcast.currentTime=0;
          }
        $rootScope.current_cast={};
        $rootScope.track=$rootScope.track-1;
        if($rootScope.playlist[$rootScope.track]){
        if($rootScope.track >= 0){
          $rootScope.play_cast($rootScope.playlist[$rootScope.track]);
          }
  }
  },1000);
          }
  
  
  



$rootScope.player_countdown=function(c){
  c.duration=c.duration-1;
    $timeout(function(){
          if(c.duration > 0){
            $rootScope.player_countdown(c);
          }
    },1000);
}





$rootScope.track_position=function(position) {
  var cast=this.cast;
  $timeout(function(){
  if(podcast){
    if(position){
      podcast.currentTime=position;
      cast.timeLeft=cast.duration - podcast.currentTime;
      $rootScope.current_cast.timeLeft=cast.duration - podcast.currentTime;
        }
      }
    },1000);
  }



  $rootScope.get_replies=function(id){
    $rootScope.fetching_replies=true;
    $timeout(function(){
    cast.replies(id).success(function(Data){
      $rootScope.fetching_replies=false;
        if(Data.status==true){
          $rootScope.cast_replies=Data.data; 
          $rootScope.fetching_replies=false;
        }
      });
    },2000);
  }
  
  

$rootScope.currentTime=function(cast) {
    $timeout(function(){
      if(podcast && cast){
            var timeLeft=cast.duration - podcast.currentTime;
            if(cast.casting){
              if(timeLeft > 0){
                  cast.bar = podcast.currentTime;
                  $rootScope.current_cast.bar=cast.bar;
                  cast.timeLeft=timeLeft;
                  $rootScope.current_cast.timeLeft=timeLeft;
                  $rootScope.currentTime(cast);
                }else{
                  cast.timeLeft=0;
                  cast.bar=0;
                }
              }
              }
      },1000);
}



$rootScope.postTime=function(post) {

  $timeout(function(){
    if(podcast){
          var timeLeft=post.duration - podcast.currentTime;
          if(post.casting){
            if(timeLeft > 0){
                post.bar = podcast.currentTime;
                post.timeLeft=timeLeft;
                $rootScope.postTime(post);
              }else{
                post.timeLeft=0;
                post.bar=0;
              }
            }
            }
    },1000);
}




$rootScope.cast_listen=function(c){
  var data={
    t_id:$rootScope.t_id,
    cast_id:c._id
  }
  if(c.listens){
    if($rootScope.user){
    var inx=c.listens.findIndex(function(cl){
        return cl==$rootScope.user._id;
     })
     if(inx < 0){
       c.listens.push($rootScope.user._id);
       cast.listen(data).success(function(){});
     }
    }
  }
}








$rootScope.build_playlist=function(cast){

  if(!$rootScope.playlist || $rootScope.playlist.length < 1){ 
    if(cast.reply){ 
      if($rootScope.cast && $rootScope.cast_replies){ 
                var r=$rootScope.cast_replies.findIndex(function(c){
                  return c._id==cast._id;
                })
              if(r > -1){
                  $rootScope.track=r;
                  $rootScope.playlist=$rootScope.cast_replies;
                  if($rootScope.cast_replies[r]){
                    $rootScope.cast_replies[r].casting=true;
                  }else{
                    $rootScope.cast_replies[r].casting=true;
                  }
                }else{
                  $rootScope.track=0;
                }         
            }
          }else{
          if($rootScope.timeline){
                  var p=$rootScope.timeline.findIndex(function(c){
                      return c._id==cast._id;
                    })
                  if(p > -1){
                    $rootScope.track=p;
                    $rootScope.timeline[p].casting=true;
                    $rootScope.playlist=$rootScope.timeline;
                  }
              }
            }
          }
        var next=$rootScope.track + 1;
        $rootScope.up_next=$rootScope.playlist[next];
}




  
      $rootScope.play_cast=function(c){
        $rootScope.pause_cast();
        $timeout(function(){
          $rootScope.current_cast=c;
        var r=this;
        if(r.cast){
        r.cast.casting=true;
        r.cast.played=true;
          if(r.cast.recast){
            r.cast.recast.casting=true;
            r.cast.recast.played=true; 
          }
      }else
        if(r.post){
          r.post.cast.casting=true;
          r.post.cast.played=true;
        }
        c.casting=true;
        $rootScope.current_cast.casting=true;
        if (podcast != undefined || podcast != null) {
          $timeout(function(){
            podcast.pause();
            podcast=null;
          });
        }
          podcast=new Audio($rootScope.trustlink($rootScope.media+$rootScope.current_cast.cast));
          if(c.timeLeft > 0){
            podcast.currentTime=c.duration-c.timeLeft;
          }else{
            podcast.currentTime=0;
          }
          podcast.play();
          $rootScope.currentTime(c);
          $rootScope.cast_listen(c);
          $rootScope.build_playlist(c);
                podcast.addEventListener('ended',function(){
                $rootScope.pause_cast();
                if($rootScope.playlist.length > 1){
                  $timeout(function(){
                    $rootScope.next_cast();
                  });
                }
         });
         podcast.addEventListener("error",function(){
            $rootScope.clear();
         })
            });
          };

        
  




    
$rootScope.fetch_profile=function(id) {
  $rootScope.fetching_casts=true;
  $rootScope.profile_casts=null;
  $timeout(function(){
  account.info(id).success(function(Data){
    if(Data.status==true){
     $rootScope.profile=Data.data; 
  $timeout(function(){
      cast.fetch(id).success(function(Data){
        $rootScope.fetching_casts=false;
        if(Data.status==true){
          if($rootScope.profile){
          $rootScope.profile_casts=Data.data;
          }
        }
      }); 
    },1000); 
          
        }  
});
},1000); 
          
}













$rootScope.refresh_cast=function(id){
  $timeout(function(){
  cast.info(id).success(function(Data){
      if(Data.status==true){
        $rootScope.cast=Data.data; 
      }
  });
},1000);
};









  

  $rootScope.trustlink=function (link) {
    return $sce.trustAsResourceUrl(link);
  };










$rootScope.timediff = function(start){
  var u=start;
  return moment(u).fromNow();
};




  
  



  if($localStorage.t_id){
    $rootScope.t_id=$localStorage.t_id;
  account.info($localStorage.t_id).success(function(Data){
    $rootScope.hide();
      if(Data.status==true){
        $rootScope.user=Data.data; 
      }else{
        console.log("could not conenct");
      }
  }).error(function(){
    console.log("could not conenct");
    $rootScope.hide();
  });
    }

  

$rootScope.get_reports=function(){
  if($rootScope.t_id){
    $timeout(function(){
  account.reports().success(function(Data){
    $rootScope.hide();
      if(Data.status==true){
        console.log("reports:");
        console.log(Data.data);
        $rootScope.reports=Data.data;
      }
    });
  },1000);
  }
}




$rootScope.delete_cast=function(c){
  $ionicPopup.show({
    template: 'Are you sure you want to delete cast?',
    title: 'Delete Cast',
    scope: $rootScope,
    buttons: [
      {
      text: 'Cancel' ,
      type:"button-light"
      },
      {
      text: '<b>Delete</b>',
      type: 'button-assertive',
      onTap: function(e) {    
          $rootScope.show();
          cast.delete(c._id).success(function(Data){
            $rootScope.hide();
              $ionicPopup.alert({template:Data.message});
              if(Data.status==true){
                if ($location.path() === "/cast" || $location.path() === "/front/cast" ) {
                  window.history.back();
                   }
              }
          }).error(function(){
              $rootScope.hide();
          });  
      }
    }
    ]
    });
  };





  

$rootScope.resolve_all=function(){
  $ionicPopup.show({
    template: 'Are you sure you want to resolve reports?',
    title: 'Resolve All',
    scope: $rootScope,
    buttons: [
      {
      text: 'Cancel' ,
      type:"button-light"
      },
      {
      text: '<b>Resolve</b>',
      type: 'button-balanced',
      onTap: function(e) {    
          $rootScope.show();
          cast.resolve_all().success(function(Data){
            $rootScope.hide();
            console.log("Rez:");
            console.log(Data);
              $ionicPopup.alert({template:Data.message});
              if(Data.status==true){
               $rootScope.get_reports();
              }
          }).error(function(){
              $rootScope.hide();
          });  
      }
    }
    ]
    });
  };


 






$rootScope.resolve_cast=function(c){
  $ionicPopup.show({
    template: 'Are you sure you want to resolve cast from reports?',
    title: 'Resolve Cast',
    scope: $rootScope,
    buttons: [
      {
      text: 'Cancel' ,
      type:"button-light"
      },
      {
      text: '<b>Resolve</b>',
      type: 'button-balanced',
      onTap: function(e) {    
          $rootScope.show();
          cast.resolve(c._id).success(function(Data){
            $rootScope.hide();
              $ionicPopup.alert({template:Data.message});
              if(Data.status==true){
               $rootScope.get_reports();
              }
          }).error(function(){
              $rootScope.hide();
          });  
      }
    }
    ]
    });
  };


 
 
   $ionicPlatform.registerBackButtonAction(function() {
     if ($location.path() === "/front/dashboard" || $location.path() === "/front/dashboard" ) {
       navigator.app.exitApp();
     }
     else {
       $ionicHistory.goBack();
     }
   }, 100);
 
  //  $cordovaDeeplinks.route({
  //   '/:id': {
  //       target: 'cast',
  //       parent: 'front.talk'
  //   },
  // }).subscribe(function(match) {
  //   $timeout(function() {
  //     $state.go(match.$route.target);
  //     $timeout(function() {
  //       $state.go(match.$route.target, {id: match.$args.id});
  //     }, 800);
  //   }, 100);
  // }, function(nomatch) {
  //   console.warn('No match', nomatch);
  // });
 
 
   $ionicPlatform.ready(function() {
    console.log("application is ready sir!");
    if(window.device){
     $rootScope.device=window.device || device;
    console.log($rootScope.device.cordova);
    } 
    if (window.audioinput) {

    window.audioinput.checkMicrophonePermission(function(hasPermission) {
      if (hasPermission) {
          console.log("We already have permission to record.");
          startCapture();
      } 
      else {	        
          // Ask the user for permission to access the microphone
          window.audioinput.getMicrophonePermission(function(hasPermission, message) {
              if (hasPermission) {
                  console.log("User granted us permission to record.");
                  startCapture();
              } else {
                  console.warn("User denied permission to record.");
              }
          });
      }
  });
   
}



    if (window.FirebasePlugin) {
      console.log("FCMPlugin initiated!");







  window.FirebasePlugin.grantPermission();
      window.FirebasePlugin.getToken(function(token) {
        console.log("...............justTalk signed fcm generated token:");
        console.log(token);
        $rootScope.pushtoken=token;
        $localStorage.pushtoken=token;
       if($rootScope.user){
        $rootScope.user.pushtoken=token;
        $rootScope.account_update($rootScope.user);
        console.log("fcmplugin stored with user............");
     }else{
      console.log("FCMPlugin not functioning.....");
     }
      window.FirebasePlugin.setBadgeNumber(0);
      window.FirebasePlugin.grantPermission();
   });





   window.FirebasePlugin.onTokenRefresh(function(token) {
    console.log("...............justtalk signed fcm generated token:");
    if(token){
      if($rootScope.user){
        $rootScope.pushtoken=token;
        $localStorage.pushtoken=$rootScope.pushtoken;
        $rootScope.user.pushtoken=$rootScope.pushtoken;
        $rootScope.account_update($rootScope.user);
          }
        }
    window.FirebasePlugin.setBadgeNumber(0);
});






      window.FirebasePlugin.onMessageReceived(function(data) {
        console.log("................on message received fired!");
        $rootScope.notify=true;
        $rootScope.get_notifications();
        $rootScope.get_talk();
        $rootScope.get_messages(); 
        if (data.tap || data.tapped || data.Tapped || data.Tap) {
      $timeout(function() {
          console.log("on message received tapped!");
          if(data.notifications){
            $state.go("front.notification");
          }else
        if(data.cast){
          $state.go("front.notification");
        }else
        if(data.chat || data.message){
          $state.go("front.messages");
        }
      },4000);
      }

window.FirebasePlugin.getBadgeNumber(function(n) {
  var badgeNumber=0;
  if(n){
  badgeNumber=n+1;
  }else{
  badgeNumber=1;
  }
  window.FirebasePlugin.setBadgeNumber(badgeNumber);
}); 
      });




     }
 
 
     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
 
       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
       cordova.plugins.Keyboard.disableScroll(true);
 
     }

//      window.WkWebView.allowsBackForwardNavigationGestures(true);
// window.WkWebView.allowsBackForwardNavigationGestures(false);

     if (window.StatusBar) {
       StatusBar.styleDefault();
     }


     if (window.Splashscreen) {
      window.Splashscreen.hide();
    }



  
    



   });
 });
 