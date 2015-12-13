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
  $scope.products = [];

  $http.get('https://uorder-lynnchen18.c9.io/meals/').then(function(resp) {
    console.log('Success', resp);
 
    for (var i = resp.data.length - 1; i >= 0; i--) {
      $scope.products[$scope.products.length] = { 
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
  
  $scope.like = function(product) {
    if(product.like)
      product.like = false;
    else
      product.like = true;
  };
    
})


/* Shops Ctrl
=========================================================================================*/
.controller('ShopsCtrl', function($scope, $http) {
  $scope.shops = [];

  $http.get('https://uorder-lynnchen18.c9.io/shops/').then(function(resp) {
    console.log('Success', resp);
 
    for (var i = resp.data.length - 1; i >= 0; i--) {
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
.controller('MealsCtrl', function($scope) {
  
})


/* Meal Info Ctrl
=========================================================================================*/
.controller('MealInfoCtrl', function($scope) {
  
})

/* My Plate Ctrl
=========================================================================================*/
.controller('PlateCtrl', function($scope, $http) {
 
})

/* Purchase Record Ctrl
=========================================================================================*/
.controller('RecordCtrl', function($scope) {


})
