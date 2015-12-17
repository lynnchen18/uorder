angular.module('starter.controllers', [])

/* Menu and Login/Signup Ctrl
=========================================================================================*/
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {

  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.signup = function() {
    $scope.data = {};

    var signupPopup = $ionicPopup.show({
      template: 'Name<input type="text" ng-model="data.name"> <br> Phone<input type="tel" ng-model="data.phone"> <br> Email<input type="email" ng-model="data.email"> <br> Password<input type="password" ng-model="data.password">',
      title: 'Sign up',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Sign up</b>',
          type: 'button-positive',
          onTap: function(e) {
            // if (!$scope.data.wifi) {
            //   e.preventDefault();
            // } else {
            //   return $scope.data.wifi;
            // }
            signupPopup.close();
            $scope.closeLogin();
          }
        }
      ]
    });
    signupPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
      signupPopup.close();
    }, 10000);
  };
})


/* Home Ctrl
=========================================================================================*/
.controller('HomeCtrl', function($scope, $http) {
  $scope.shops = [];
  $scope.meals = [];

  $http.get('https://uorder-lynnchen18.c9.io/shops/').then(function(resp) {
    console.log('Success', resp);
 
    for (var i = 0; i <= resp.data.length - 1; i++) {
      $scope.shops[$scope.shops.length] = { 
        id: resp.data[i].shop_id, 
        name: resp.data[i].name, 
      }
    };

  $http.get('https://uorder-lynnchen18.c9.io/meals/').then(function(resp) {
    console.log('Success', resp);
 
    for (var i = 0; i <= resp.data.length - 1; i++) {
      $scope.meals[$scope.meals.length] = { 
        shopId: resp.data[i].shop_id, 
        shopName: $scope.getShopName(resp.data[i].shop_id),
        id: resp.data[i].meal_id, 
        name: resp.data[i].name, 
        cover: resp.data[i].cover, 
        price: resp.data[i].price, 
        like: false
      }
    };

  }, function(err) {
    console.error('ERR', err);

  });

  }, function(err) {
    console.error('ERR', err);

    
  });
  
  $scope.like = function(meal) {
    if(meal.like)
      meal.like = false;
    else
      meal.like = true;
  };
  
  $scope.getShopName = function(shopId) {
    var shopName = "";
    for (var i = $scope.shops.length - 1; i >= 0; i--) {
      if ($scope.shops[i].id == shopId)
        shopName = $scope.shops[i].name
    };
    return shopName;
  };
})


/* Shops Ctrl
=========================================================================================*/
.controller('ShopsCtrl', function($scope, $http) {
  $scope.shops = [];

  $http.get('https://uorder-lynnchen18.c9.io/shops/').then(function(resp) {
    console.log('Success', resp);
 
    for (var i = 0; i <= resp.data.length - 1; i++) {
      $scope.shops[$scope.shops.length] = { 
        id: resp.data[i].shop_id, 
        name: resp.data[i].name, 
        cover: resp.data[i].cover
      }
    };

  }, function(err) {
    console.error('ERR', err);

    
  });
})



/* Meals Ctrl
=========================================================================================*/
.controller('MealsCtrl', function($scope, $http, $stateParams) {
  $scope.meals = [];
  $scope.shop;

  $http.get('https://uorder-lynnchen18.c9.io/shop' + $stateParams.shopId + 'meals/').then(function(resp) {
    console.log('Success', resp);
    for (var i = 0; i <= resp.data.length - 1; i++) {
      $scope.meals[$scope.meals.length] = { 
        id: resp.data[i].meal_id, 
        name: resp.data[i].name, 
        cover: resp.data[i].cover, 
        price: resp.data[i].price, 
        like: false
      }
    };

  }, function(err) {
    console.error('ERR', err);

  });
  
  $http.get('https://uorder-lynnchen18.c9.io/shop' + $stateParams.shopId + '/').then(function(resp) {
    console.log('Success', resp);
    $scope.shop = resp.data[0].name;
    console.log($scope.shop);
  }, function(err) {
    console.error('ERR', err);

  });
  

  $scope.like = function(meal) {
    if(meal.like)
      meal.like = false;
    else
      meal.like = true;
  };
})


/* Meal Info Ctrl
=========================================================================================*/
.controller('MealInfoCtrl', function($scope, $http, $routeParams) {
  
})

/* My Plate Ctrl
=========================================================================================*/
.controller('PlateCtrl', function($scope, $http) {
 
})

/* Purchase Record Ctrl
=========================================================================================*/
.controller('RecordCtrl', function($scope, $http) {


})
