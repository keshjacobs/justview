var live="https://api.justtalkapp.com/";
var local="http://localhost:8000/";
var endpoint1="admin/";
var endpoint="user/";
// var viva="http://18.219.171.89:3000/";
var API1=live+endpoint1;
var API=live+endpoint;
var media=live+"";
var error_connection="Check your internet connection";
var connection_error=error_connection;



function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
};

function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }


app.factory('account',function($http){
  return  {
    search: function(p){
       return $http.get(API + "search/"+p);
     },
     all: function(){
        return $http.get(API1 + "users/all");
      },
    login: function(v){
      return  $http.post(API1 + 'login', v);
    },
    register: function(v){
      return  $http.post(API1 + 'register', v);
    },
    info: function(p){
      return $http.get(API1 + "info/"+p);
    },
    reports: function(p){
      return $http.get(API1 + "reports");
    },
    suggestion:function(){
      return $http.get(API +  "suggestion");
    },
    block:function(data){
      return $http.post(API +  "block",data);
    },
    unblock:function(data){
      return $http.post(API +  "unblock",data);
    }
  };
});






app.factory('cast',function($http){
  return  {
    fetch: function(data){
       return $http.get(API + "casts/"+data);
     },
     all: function(){
        return $http.get(API1 + "casts/all");
      },
     info: function(p){
        return $http.get(API + "cast/info/"+p);
      },
    replies: function(data){
      return $http.get(API + "cast/replies/"+data);
    },
    delete: function(data){
      return $http.get(API1 + "report/delete/"+data);
    },
    resolve: function(data){
      return $http.get(API1 + "report/resolve/"+data);
    },
    resolve_all: function(data){
      return $http.get(API1 + "report/resolve/all");
    },
    listen:function(data){
      return $http.post(API +  "cast/listen",data);
    },
    top:function(){
      return $http.get(API1 +  "cast/top");
    }
  };
})

