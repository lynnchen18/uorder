angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    /* Side Menu 
    =======================================================*/
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  /* Home 
  =======================================================*/  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  /* Shop List 
  =======================================================*/
  .state('app.shopList', {
    url: '/shopList',
    views: {
      'menuContent': {
        templateUrl: 'templates/shopList.html',
        controller: 'ShopsCtrl'
      }
    }
  })

  /* Meal List 
  =======================================================*/
  .state('app.mealList', {
    url: '/shop:shopId',
    views: {
      'menuContent': {
        templateUrl: 'templates/mealList.html',
        controller: 'HomeCtrl'
      }
    }
  })

  /* My Plate 
  =======================================================*/
  .state('app.myPlate', {
    url: '/myPlate',
    views: {
      'menuContent': {
        templateUrl: 'templates/myPlate.html'
      }
    }
  })

  // .state('app.myOrder', {
  //   url: '/myOrder',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/myOrder.html'
  //     }
  //   }
  // })

  // .state('app.myFavorite', {
  //   url: '/myFavorite',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/myFavorite.html',
  //       controller: 'HomeCtrl'
  //     }
  //   }
  // })
  
  /* Purchase Record 
  =======================================================*/
  .state('app.purchaseRecords', {
    url: '/purchaseRecords',
    views: {
      'menuContent': {
        templateUrl: 'templates/purchaseRecords.html'
      }
    }
  })

  /* Settings 
  =======================================================*/
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html'
      }
    }
  })

  // .state('app.about', {
  //   url: '/about',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/about.html'
  //     }
  //   }
  // })

  /* Meal Info 
  =======================================================*/
  .state('app.mealInfo', {
    url: '/meal:productId',
    views: {
      'menuContent': {
        templateUrl: 'templates/mealInfo.html'
      }
    }
  })

  
  // .state('app.login', {
  //   url: '/login',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/login.html'
  //     }
  //   }
  // })

  .state('app.keeper', {
    url: '/keeper',
    views: {
      'menuContent':{
        templateUrl: 'templates/keeper.html',
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
