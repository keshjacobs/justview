app.controller('Cast', function($localStorage,$ionicScrollDelegate,$rootScope,$timeout,Upload,$ionicModal,account,cast,$ionicPopup) {
  navigator.getUserMedia= navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


  $rootScope.fetch_user=function(id){
    var n=this;
    if(id){
    account.info(id).success(function(Data){
        if(Data.status==true){
          if(n.cast){
         n.cast.user=Data.data; 
          } if(n.caster){
            n.caster.data=Data.data;
           }
        }
      });
    }
  }
  
  

  

 $rootScope.recording=false;
    
     $rootScope.post={};


  $ionicModal.fromTemplateUrl('pop-ups/record.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $rootScope.record_box = modal;
  });







  








  


    





   
            

$rootScope.post_cast=function(cast){
    var go=true;
    if(cast.title){
      go=$rootScope.censor(cast.title);
    }
    if(go){
      var uploadUrl = API + "cast/upload";
      console.log("Broadcasting...");
      cast.t_id=$rootScope.t_id;
      cast.file=$rootScope.file;
      console.log(cast);
      cast.mentions=[];
      if($rootScope.mentions.length > 0){
          for(var i=0; i < $rootScope.mentions.length;i++){
            cast.mentions.push($rootScope.mentions[i]._id);
          }
      }
      cast.mentions=JSON.stringify(cast.mentions);
      $rootScope.broadcasting();
    Upload.upload({
      url: uploadUrl,
      data: cast
    }).then(function(resp) {
      var msg=resp.data.message;
      $rootScope.hide();
      $rootScope.pause_cast();
      $rootScope.clear();
      $ionicPopup.alert({template:msg});
      if(resp.data.status==true){
        $timeout(function(){
        $rootScope.clear();
        },2000);
        if(cast.recast){
            if($rootScope.cast.recasts){
                var recast=resp.data.data;
                $rootScope.cast.recasts.push(recast);
            }
        }
        if(cast.reply){
            if($rootScope.cast.replies){
                var reply=resp.data.data;
                $rootScope.cast.replies.push(reply);
            }
        }
        if($rootScope.cast){
          $rootScope.refresh_cast($rootScope.cast._id);
          $rootScope.get_replies($rootScope.cast._id);
        }
         $rootScope.record_box.hide();
         $rootScope.recast_box.hide();
         $rootScope.reply_box.hide();
         $rootScope.get_talk();
         $ionicScrollDelegate.scrollTop();
         $rootScope.refresh_profile();
      }
    }).catch(function(){
      $rootScope.hide();
      $ionicPopup.alert({
        template: "network error."
      });
    });
  }else{
    $ionicPopup.alert({
      template: "Your cast title contains some negative expression, please change it before you can upload this cast"
    });
  }
};







$rootScope.stop_recording=function(){
  $rootScope.recording=false;
  $rootScope.file_added=true;
  if($rootScope.mediaRec){
    $rootScope.mediaStream.getTracks().forEach((track) => {
        track.stop();
        });  
    if($rootScope.mediaRec.state!="inactive"){
      $rootScope.stop_recording();
      $rootScope.clear();
      // $rootScope.mediaRec.stop();
    }
    }
}







$rootScope.reply_cast=function(cast) {  
  $rootScope.clear();
  if($rootScope.podcast){
    $rootScope.podcast.pause();
    $rootScope.podcast.currentTime=0;
  }
  if($rootScope.user){
     $rootScope.post={};
     $rootScope.post.cast=cast;
     $rootScope.post.reply=cast._id;
    $rootScope.reply_box.show();
  }else{
    $rootScope.auth_box.show();
    }
}









$rootScope.recast=function(cast) {
  $rootScope.clear();
  if($rootScope.podcast){
    $rootScope.podcast.pause();
    $rootScope.podcast.currentTime=0;
  }
  if($rootScope.user){
     $rootScope.post={};
     $rootScope.post.cast=cast;
     $rootScope.post.recast=cast._id;
    $rootScope.recast_box.show();
  }else{
    $rootScope.auth_box.show();
  }
}












$rootScope.like_cast=function(c){

  if($rootScope.user){
    var c=cast;
    if(this.cast.recast){
      c=this.cast.recast;
    }else
    if(this.cast){
      c=this.cast;
    }else
   if($rootScope.current_cast){
    c=$rootScope.current_cast;
  }else{
    c=$rootScope.cast;
  }
    if($rootScope.user){
    var data={
              cast_id:c._id,
              _id:$rootScope.user._id
            };
            if(c.likes){
              c.likes.push($rootScope.user._id);
            }
        cast.like(data);
    }
  }else{
    $rootScope.auth_box.show();
  }
  };
  








  
  $rootScope.unlike_cast=function(c){
    if($rootScope.user){
    if(this.cast.recast){
      c=this.cast.recast;
    }else
  if(this.cast){
    c=this.cast;
  }else if($rootScope.current_cast){
    c=$rootScope.current_cast;
  }else{
    c=$rootScope.cast;
  }
    if($rootScope.user){
    var data={
      cast_id:c._id,
      t_id:$localStorage.t_id,
      _id:$rootScope.user._id
    };
    c.likes.splice(c.likes.indexOf($rootScope.user._id),1);
    cast.unlike(data).success(function(){});
  }}else{
    $rootScope.auth_box.show();
  }
  };











$rootScope.close_recorder=function(){
  $rootScope.clear();
  $rootScope.record_box.hide();
  $rootScope.record_box.hide();
  $rootScope.recast_box.hide();
  $rootScope.reply_box.hide();
}














$rootScope.start_recording=function() {
  $rootScope.pause_cast();
  $rootScope.clear();
    var callerror=function() {
      $ionicPopup.alert({template:"Microphone failed to  connect"});
    };
      var callsuccess=function(stream) {
        $rootScope.recording=true;
        $rootScope.file=null;
        let chunks = [];
        $rootScope.timer=180;
      $rootScope.mediaStream = stream;
      $rootScope.mediaRec = new MediaRecorder(stream);
      $rootScope.mediaRec.ondataavailable = function(e){
        chunks.push(e.data);
        };
      $rootScope.mediaRec.onstop = function(){ 
        $rootScope.recording=false;
          $timeout(function(){
          $rootScope.file = new Blob(chunks,{ 'type' : 'audio/aac' });
          $rootScope.file.lastModifiedDate = new Date();
          $rootScope.file.name = "castaway-"+$rootScope.file.lastModifiedDate+".aac";   
          $rootScope.file_added=true;
          $rootScope.post.file=$rootScope.file;
          var reader = new FileReader();
          reader.onload = function (event) {
              var audioContext = new (window.AudioContext || window.webkitAudioContext)();
              audioContext.decodeAudioData(event.target.result, function(buffer) {
                  $rootScope.post.duration = buffer.duration;
                  $rootScope.post.timeLeft=buffer.duration;
                  console.log("The duration of the song is of: " + $rootScope.post.duration + " seconds");

              });
          };
          reader.onerror = function (event) {
            $rootScope.file_added=false;
            $rootScope.stop_recording();
            console.error("An error ocurred reading the file: ", event);
          };
          reader.readAsArrayBuffer($rootScope.file);
          if($rootScope.file){
            $rootScope.post.file=$rootScope.file;
            console.log("Done recording:");
            console.log($rootScope.post.file);  
          }
        },1000);
          }
      $rootScope.mediaRec.onstart = function(){
        var secs=180*1000;
        $timeout(function(){
          $rootScope.stop_recording();
        },secs);
        $rootScope.count_down();
      };
      $rootScope.mediaRec.start();
  };
  if(typeof navigator.mediaDevices.getUserMedia === 'undefined'){
    navigator.getUserMedia({ audio: true }).then(callsuccess,callerror);
  }else{
    navigator.mediaDevices.getUserMedia({ audio: true }).then(callsuccess).catch(callerror);
  };
}






    });
    