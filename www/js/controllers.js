angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
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
})

.controller('DiningMenuCatheyCtrl', function($scope, $http){
  $http.get('js/cathey.json').success(function(data) {
      console.log('data is gotten');
      $scope.breakfast = {name: 'breakfast', data: data['breakfast']};
      $scope.lunch =  {name: 'lunch', data: data['lunch']};
      $scope.dinner = {name: 'dinner', data: data['dinner']};
      $scope.active = $scope.breakfast;
  }).error(function(data,status,error,config){
      $scope.contents = [{heading:"Error",description:"Could not load json data"}];
  });
  $scope.location = "Cathey";
  $scope.makeBreakfast = function() {
    $scope.active = $scope.breakfast;
  };
  $scope.makeLunch = function() {
    $scope.active = $scope.lunch;
  };
  $scope.makeDinner = function() {
    $scope.active = $scope.dinner;
  };
})

.controller('CampusMarketsCtrl', function($scope, $ionicModal){
  $scope.markets = [
    {
      'name'    : 'Maroon Market',
      'address' : '5640 S. University Ave.',
      'hours'   : 'M-Su 10am - 3am'
    },
    {
      'name'    : 'Midway Market',
      'address' : '6031 S. Ellis Ave.',
      'hours'   : 'M-Su 10am- 3am'
    }
  ];
  $scope.cafes = [
    {
      'name'    : 'Bio Cafe',
      'address' : '924 East 57th St.',
      'hours'   : 'M-Fr 8am - 3pm'
    },
    {
      'name'    : 'Classics Cafe',
      'address' : '1010 E. 59th St.',
      'hours'   : 'M-Fr 8am - 3pm'
    },
  ];

  $scope.currentModalData = null;

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(type, index) {
    if(type == "markets") {
      $scope.currentModalData = $scope.markets[index];
    }
    else {
      $scope.currentModalData = $scope.cafes[index];
    }
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

;
