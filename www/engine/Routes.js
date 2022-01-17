app.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
    $ionicConfigProvider.views.forwardCache(true);
    
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  
  
  
      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');
  
  
      $stateProvider
  
  
  
      .state('splash', {
        url: '/splash',
        cache: true,
        templateUrl: 'pages/splash.html',
        controller:"splash"
      })
  
  
  
  
      .state('auth', {
        url: '/auth',
        templateUrl: 'pages/auth.html',
        controller:"Auth"
      })
  
  
        .state('front', {
          url: '/front',
          abstract:true,
          templateUrl: 'pages/front.html'
        })

        
        .state('front.dashboard', {
          url: '/dashboard',
          cache: true,
          views: {
            'front-dashboard': {
              templateUrl: 'pages/front/dashboard.html',
              controller:'Dashboard'
            }
          }
        })





        .state('front.find', {
          url: '/find',
          cache: true,
          views: {
            'front-find': {
              templateUrl: 'pages/front/find.html',
              controller:'Explore'
            }
          }
        })
  

  
        .state('front.reports', {
          url: '/reports',
          cache: true,
          views: {
            'front-reports': {
              templateUrl: 'pages/front/reports.html',
              controller:"Cast"
            }
          }
        })
  
        .state('front.settings', {
          url: '/settings',
          cache: true,
          views: {
            'front-settings': {
              templateUrl: 'pages/front/settings.html',
              controller:"profile"
            }
          }
        })
  
  

  


  
.state('cast', {
  url: '/cast',
  templateUrl: 'pages/cast.html',
  controller:"Cast"
})



.state('aprofile', {
  url: '/aprofile/:id',
  templateUrl: 'pages/profile.html',
  controller:"profile"
})


  

        
        
  
      $urlRouterProvider.otherwise('/splash');
  
    });