angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.signup = function() {
    $scope.data = {};

    // An elaborate, custom popup
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
      signupPopup.close(); //close the popup after 3 seconds for some reason
    }, 10000);
  };
})

.controller('HomeCtrl', function($scope, $http) {
  $scope.products = [
    {
      id: "001",
      name: 'Fruit & Vegs',
      cover: 'img/fruit-and-veg.jpg',
      price: 50,
      like: false
    },
    {
      id: "002",
      name: 'Pasta',
      cover: 'img/pasta1.jpg',
      price: 65,
      like: false
    },
    {
      id: "003",
      name: 'Donut',
      cover: 'img/donuts.jpg',
      price: 30,
      like: false
    },
  ];
  
  $http.get('https://uorder-lynnchen18.c9.io/querymeal/').then(function(resp) {
    console.log('Success', resp);
 
    for (var i = resp.data.length - 1; i >= 0; i--) {
      $scope.products[$scope.products.length] = 
      { id: resp.data[i].meal_id, 
        name: resp.data[i].name, 
        cover: resp.data[i].cover, 
        price: resp.data[i].price, 
        like: false
      }
    };

  }, function(err) {
    console.error('ERR', err);

    // err.status will contain the status code
  });
  
  $scope.like = function(product) {
    if(product.like)
      product.like = false;
    else
      product.like = true;
  };
    
})

.controller('ShopsCtrl', function($scope) {
  $scope.shops = [
    {
      id: "01",
      name: "Shop 1"
    },
    {
      id: "02",
      name: "Shop 2"
    },
    {
      id: "03",
      name: "Shop 3"
    },
    {
      id: "04",
      name: "Shop 4"
    },
  ];
})


/*
.controller('MealCtrl', function($scope) {
  
})

.controller('PlateCtrl', function($scope, $http) {
 $http.get('https://cors-test.appspot.com/test').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})

.controller('OrderCtrl', function($scope) {


})

.controller('FavoriteCtrl', function($scope) {


})

.controller('RecordCtrl', function($scope) {


})

.controller('KeeperCtrl', function($scope) {
  

})
*/
