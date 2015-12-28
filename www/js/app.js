angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB', 'ionic-timepicker', 'ionicShop'])

.run(function($ionicPlatform, ngFB, $http) {
  ngFB.init({appId: '969386769767276'});
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
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
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
        controller: 'MealsCtrl'
      }
    }
  })

  /* My Plate 
  =======================================================*/
  .state('app.myPlate', {
    url: '/myPlate',
    views: {
      'menuContent': {
        templateUrl: 'templates/myPlate.html',
        controller: 'PlateCtrl'
      }
    }
  })

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
        templateUrl: 'templates/purchaseRecords.html',
        controller: 'RecordCtrl'
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

  /* Meal Info 
  =======================================================*/
  .state('app.mealInfo', {
    url: '/meal:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/mealInfo.html',
        controller: 'MealInfoCtrl'
      }
    }
  })
  ;$urlRouterProvider.otherwise('/app/home'); 
})

.directive('standardTimeNoMeridian', function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: {etime: '=etime'},
    template: "<strong>{{stime}}</strong>",
    link: function (scope, elem, attrs) {
    scope.stime = epochParser(scope.etime, 'time');
    function prependZero(param) {
      if (String(param).length < 2) {
        return "0" + String(param);
      }
      return param;
    }
    function epochParser(val, opType) {
      if (val === null) {
        return "00:00";
      } else {
        if (opType === 'time') {
          var hours = parseInt(val / 3600);
          var minutes = (val / 60) % 60;
          return (prependZero(hours) + ":" + prependZero(minutes));
        }
      }
    }
    scope.$watch('etime', function (newValue, oldValue) {
      scope.stime = epochParser(scope.etime, 'time');
    });
  }
};})
;