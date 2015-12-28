angular.module('starter.controllers', ['ngOpenFB'])

/* Menu and Login/Signup Ctrl
=========================================================================================*/
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, ngFB) {
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          $scope.closeLogin();
        } else {
          alert('Facebook login failed');
        }
      });
  };

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
    console.log('HomeCtrl: get shops data success', resp);
 
    for (var i = 0; i <= resp.data.length - 1; i++) {
      $scope.shops[$scope.shops.length] = { 
        id: resp.data[i].shop_id, 
        name: resp.data[i].name, 
      }
    };

  $http.get('https://uorder-lynnchen18.c9.io/meals/').then(function(resp) {
    console.log('HomeCtrl: get meals data success', resp);
 
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
    console.log('ShopsCtrl: get shops data success', resp);
 
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
    console.log('MealsCtrl: get meals data success', resp);
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
    console.log('MealsCtrl: get shop data success', resp);
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
.controller('MealInfoCtrl', function($scope, $http, $stateParams, Products) {
  $scope.shops = [];
  $http.get('https://uorder-lynnchen18.c9.io/shops/').then(function(resp) {
    console.log('MealInfoCtrl: get shop data success', resp);
    for (var i = 0; i <= resp.data.length - 1; i++) {
      $scope.shops[$scope.shops.length] = { 
        id: resp.data[i].shop_id, 
        name: resp.data[i].name, 
      }
    };
  }, function(err) {
    console.error('ERR', err);
  });

  $scope.meal;
  $http.get('https://uorder-lynnchen18.c9.io/meal' + $stateParams.id + '/').then(function(resp) {
    console.log('MealInfoCtrl: get meal data success', resp);
    $scope.meal = {
      shopId: resp.data[0].shop_id, 
      shopName: $scope.getShopName(resp.data[0].shop_id),
      id: resp.data[0].meal_id, 
      name: resp.data[0].name, 
      cover: resp.data[0].cover, 
      price: resp.data[0].price, 
      info: resp.data[0].info, 
    };
    console.log($scope.meal);
  }, function(err) {
    console.error('ERR', err);
  });

  

  $scope.orderNow = function (){
    $state.go('app.myPlate');
  };
  $scope.putIntoPlate = function (product){
    Products.addToCart(product);
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

/* My Plate Ctrl
=========================================================================================*/
.controller('PlateCtrl', function($scope, $http, Products) {
  $scope.timePickerObject24Hour = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),  //Optional
    step: 10,  //Optional
    format: 24,  //Optional
    titleLabel: '24-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Cancel',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      timePicker24Callback(val);
    }
  };
  function timePicker24Callback(val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      $scope.timePickerObject24Hour.inputEpochTime = val;
      var selectedTime = new Date(val * 1000);
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
    }
  }

  $scope.meals = Products.cartProducts;
  console.log("PlateCtrl (meals): " + $scope.meals);

  $scope.plates = [];
  for (var meal = 0; meal <= $scope.meals.length - 1; meal++) {
    if ($scope.plates.length === 0) {
      $scope.plates[0] = {
        shop: {
          id: $scope.meals[meal].shopId,
          name: $scope.meals[meal].shopName,
        },
        meals: [{
          id: $scope.meals[meal].id,
          name: $scope.meals[meal].name,
          price: $scope.meals[meal].price,
          quantity: $scope.meals[meal].quantity
        }]
      };
      console.log("first");
    } else {
      for (var shop = 0; shop <= $scope.plates.length - 1; shop++) {
        if ($scope.plates[shop].shop.id === $scope.plates[shop].id) {
          $scope.plates[shop].meals[$scope.plates[shop].meals.length] = {
            id: $scope.meals[meal].id,
            name: $scope.meals[meal].name,
            price: $scope.meals[meal].price,
            quantity: $scope.meals[meal].quantity
          };
          console.log("if");
          break;
        } else if (shop === $scope.plates.length - 1) {
          $scope.plates[shop+1] = {
            shop: {
              id: $scope.meals[meal].shopId,
              name: $scope.meals[meal].shopName,
            },
            meals: [{
              id: $scope.meals[meal].id,
              name: $scope.meals[meal].name,
              price: $scope.meals[meal].price,
              quantity: $scope.meals[meal].quantity
            }]
          };
          console.log("else if");
          break;
        }
      }
    }
  }

  console.log("PlateCtrl (plates): " + $scope.plates);

  $scope.order = function (){
    $http({
      url: 'https://uorder-lynnchen18.c9.io/print_meals/',
      method: "POST",
      data: {
        'data': $scope.meals
      },
      headers: {
        'X-CSRFToken': 'csrftoken'
      }
    }).success(function (data, status, config) {
      console.log("PlateCtrl: post orders to django success", status)
    }).error(function (data, status, config) {
      console.error('ERR', status);
    });
  }
  
})

/* Purchase Record Ctrl
=========================================================================================*/
.controller('RecordCtrl', function($scope, $http, Products) {
  $scope.meals = Products.cartProducts;
  console.log("RecordCtrl (meals): " + $scope.meals);

  $scope.plates = [];
  for (var meal = 0; meal <= $scope.meals.length - 1; meal++) {
    if ($scope.plates.length === 0) {
      $scope.plates[0] = {
        shop: {
          id: $scope.meals[meal].shopId,
          name: $scope.meals[meal].shopName,
        },
        meals: [{
          id: $scope.meals[meal].id,
          name: $scope.meals[meal].name,
          price: $scope.meals[meal].price,
          quantity: $scope.meals[meal].quantity
        }]
      };
      console.log("first");
    } else {
      for (var shop = 0; shop <= $scope.plates.length - 1; shop++) {
        if ($scope.plates[shop].shop.id === $scope.plates[shop].id) {
          $scope.plates[shop].meals[$scope.plates[shop].meals.length] = {
            id: $scope.meals[meal].id,
            name: $scope.meals[meal].name,
            price: $scope.meals[meal].price,
            quantity: $scope.meals[meal].quantity
          };
          console.log("if");
          break;
        } else if (shop === $scope.plates.length - 1) {
          $scope.plates[shop+1] = {
            shop: {
              id: $scope.meals[meal].shopId,
              name: $scope.meals[meal].shopName,
            },
            meals: [{
              id: $scope.meals[meal].id,
              name: $scope.meals[meal].name,
              price: $scope.meals[meal].price,
              quantity: $scope.meals[meal].quantity
            }]
          };
          console.log("else if");
          break;
        }
      }
    }
  }

  console.log("RecordCtrl (plates): " + $scope.plates);

})
