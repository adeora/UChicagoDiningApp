// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.filter('vegetarian', function() {
  return function(input) {
    var out = "";
    if(input == '1') {
      out = ", Vegetarian";
    }
    return out;
  }
})

.filter('vegan', function() {
  return function(input) {
    var out = "";
    if(input == '1') {
      out = ", Vegan";
    }
    return out;
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.catheyDining', {
    url: '/dining/cathey',
    views: {
      'app': {
        templateUrl: 'templates/diningMenu.html',
        controller: 'DiningMenuCatheyCtrl'
      }
    }
  })

  .state('app.markets', {
    url: '/dining/markets',
    views: {
      'app' : {
        templateUrl: 'templates/campusMarkets.html',
        controller: 'CampusMarketsCtrl'
      }
    }
  })

  .state('app.map', {
    url: '/dining/map',
    views: {
      'app' : {
        templateUrl: 'templates/diningMap.html',
        controller: 'MapCtrl'
      }
    }
  })

    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/dining/cathey');
});
