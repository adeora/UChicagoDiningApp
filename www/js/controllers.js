var markets = [{
  'name': 'Maroon Market',
  'address': '5640 S. University Ave., Chicago, IL',
  'hours': 'M-Su 10am - 3am',
  'coords': {
    'lat': 41.791817,
    'long': -87.598456
  }
}, {
  'name': 'Midway Market',
  'address': '6031 S. Ellis Ave., Chicago, IL',
  'hours': 'M-Su 10am- 3am',
  'coords': {
    'lat': 41.785025,
    'long': -87.600349
  }
}];

var cafes = [{
  'name': 'Bio Cafe',
  'address': '924 East 57th St., Chicago, IL',
  'hours': 'M-Fr 8am - 3pm',
  'coords': {
    'lat': 41.791760,
    'long': -87.602787
  }
}, {
  'name': 'Classics Cafe',
  'address': '1010 E. 59th St., Chicago, IL',
  'hours': 'M-Fr 8am - 3pm',
  'coords': {
    'lat': 41.787911,
    'long': -87.600828
  }
}, {
  'name': 'Einstein Brothers Bagels',
  'address': '5706 S. University Ave., Chicago, IL',
  'hours': 'M-Fr 7am - 11pm, Sa-Su 9am - 11pm',
  'coords': {
    'lat': 41.790914,
    'long': -87.598263
  }
}, {
  'name': 'Gordon Cafe',
  'address': '927 E. 57th St., Chicago, IL',
  'hours': 'M-Fr 8am - 3pm',
  'coords': {
    'lat': 41.791102,
    'long': -87.602719
  }
}, {
  'name': 'Harris Cafe',
  'address': '1155 E. 60th St., Chicago, IL',
  'hours': 'M-Fr 8am - 3pm & 4-7pm',
  'coords': {
    'lat': 41.785644,
    'long': -87.597098
  }
}, {
  'name': 'Hutchinson Commons',
  'address': '5706 S. University Ave., Chicago, IL',
  'hours': 'M-Th 11am - 8pm, Fr 11am - 3pm, Sa 11:30am - 7pm',
  'coords': {
    'lat': 41.790914,
    'long': -87.598263
  }
}, {
  'name': 'Law School Cafe',
  'address': '1111 E. 60th St., Chicago, IL',
  'hours': 'M-Th 8am - 5pm, Fr 8am - 3:30pm',
  'coords': {
    'lat': 41.785060,
    'long': -87.599001
  }
}, {
  'name': 'Cafe Logan',
  'address': '915 E. 60th St., Chicago, IL',
  'hours': 'M-Fr 8am - 8pm, Sa-Su 12pm-8pm',
  'coords': {
    'lat': 41.785450,
    'long': -87.603927
  }
}, {
  'name': 'Press Cafe',
  'address': '1427 E. 60th St., Chicago, IL',
  'hours': 'M-Fr 8am - 3pm',
  'coords': {
    'lat': 41.785783,
    'long': -87.590542
  }
}, {
  'name': 'SSA Cafe',
  'address': '969 E. 60th St., Chicago, IL',
  'hours': 'M-Th 8am - 3pm',
  'coords': {
    'lat': 41.785580,
    'long': -87.601735
  }
}, {
  'name': 'Stuart Cafe',
  'address': '5835 S. Greenwood Ave., Chicago, IL',
  'hours': 'M-Fr 8am - 3pm',
  'coords': {
    'lat': 41.788401,
    'long': -87.599099
  }
}, {
  'name': 'Tiffin Cafe',
  'address': '1414 E. 59th St., Chicago, IL',
  'hours': 'M-Su 4pm-12am',
  'coords': {
    'lat': 41.788077,
    'long': -87.590951
  }
}, {
  'name': 'Starbucks at Saieh Hall',
  'address': '5757 S. University Ave., Chicago, IL',
  'hours': 'M-Fr 7am - 6pm',
  'coords': {
    'lat': 41.789978,
    'long': -87.598015
  }
}, {
  'name': 'Barnes & Noble Bookstore Cafe',
  'address': '970 E 58th st., Chicago, IL',
  'hours': 'M-Fr 7am - 6pm, Sa 9am-4pm',
  'coords': {
    'lat': 41.789560,
    'long': -87.602033
  }
}];

(function (global) {
    "use strict";

    function onDeviceReady () {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
    }

    function onOnline () {
        loadMapsApi();
    }

    function onResume () {
        loadMapsApi();
    }

    function loadMapsApi () {
        if(navigator.connection.type === Connection.NONE || google.maps) {
            return;
        }
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBdH7_rhIYwS4ml6SqbvPMtV6joV--ilbI&sensor=true');
    }

    document.addEventListener("deviceready", onDeviceReady, false);
})(window);

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

.controller('DiningMenuCatheyCtrl', function($scope, $http) {

  $http.get('http://abhimanyudeora.com:8081/allData').success(function(data) {

    $scope.breakfast = {
      name: 'breakfast',
      data: {}
    };

    $scope.lunch = {
      name: 'lunch',
      data: {}
    };

    console.log($scope.lunch);

    $scope.dinner = {
      name: 'dinner',
      data: {}
    };

    for(var i=0; i < data.length; i++) {
      switch (data[i].sectionWhen) {
        case 0: //breakfast
          if( $scope.breakfast.data[data[i].sectionName] == undefined ) {
            $scope.breakfast.data[data[i].sectionName] = [data[i]];
          }
          else {
            $scope.breakfast.data[data[i].sectionName].push(data[i]);
          }
          break;
        case 1: //lunch
        if( $scope.lunch.data[data[i].sectionName] == undefined ) {
          $scope.lunch.data[data[i].sectionName] = [data[i]];
        }
        else {
          $scope.lunch.data[data[i].sectionName].push(data[i]);
        }
        break;
          break;
        case 2: //dinner
          if( $scope.dinner.data[data[i].sectionName] == undefined ) {
            $scope.dinner.data[data[i].sectionName] = [data[i]];
          }
          else {
            $scope.dinner.data[data[i].sectionName].push(data[i]);
          }
          break;
        default:
          break;
      }
    }

    $scope.active = $scope.breakfast;
  }).error(function(data, status, error, config) {
    $scope.contents = [{
      heading: "Error",
      description: "Could not load json data"
    }];
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

.controller('CampusMarketsCtrl', function($scope, $ionicModal) {

  $scope.markets = markets;
  $scope.cafes = cafes;

  $scope.currentModalData = null;

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(type, index) {
    if (type == "markets") {
      $scope.currentModalData = $scope.markets[index];
    } else {
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

.controller('MapCtrl', function($scope, $http) {

  $scope.places = cafes.concat(markets);

  function initMap(crds) {
    // create the map
    var myPosition = new google.maps.LatLng(crds.latitude, crds.longitude);
    console.log("initing map");
    var mapOptions = {
      center: {
        lat: crds.latitude,
        lng: crds.longitude
      },
      zoom: 17
    };
    var map = new google.maps.Map(document.getElementById('dining-map-canvas'), mapOptions);
    //create the marker
    var userPositionMarker = new google.maps.Marker({
      map: map,
      position: myPosition,
      title: "You!",
      animation: google.maps.Animation.DROP,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4
      }

    });
    // draw the circle for accuracy
    var accuracyCircle = new google.maps.Circle({
      map: map,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      radius: crds.accuracy,
      center: myPosition
    });

    // add the markers and the infowindows

    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var markers = new Array();
    for (i = 0; i < $scope.places.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.places[i]['coords']['lat'], $scope.places[i]['coords']['long']),
        map: map
      });
      markers.push(marker);
      google.maps.event.addListener(marker, 'mousedown', (function(marker, i) {
        return function() {
          var distance = calculateDistance($scope.places[i]['coords']['lat'], $scope.places[i]['coords']['long'], crds.latitude, crds.longitude).toFixed(3);
          var walkString = calculateWalkTime(distance);
          var contentString = "<strong>" + $scope.places[i]['name'] + "</strong><br/>";
          contentString += $scope.places[i]['address'] + "<br/>";
          contentString += $scope.places[i]['hours'] + "<br/>";
          contentString += distance + " miles from you<br/>";
          contentString += walkString;
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;

    console.log('Latitude is ' + latitude + '° Longitude is ' + longitude + '° with accuracy of ' + accuracy + " meters");

    initMap(position.coords);
    /*initMap({
      "latitude": 41.792000,
      "longitude": -87.598120,
      "accuracy": 15
    });*/
  };

  function error() {
    console.log("Unable to retrieve your location");
  };

  var geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  navigator.geolocation.getCurrentPosition(success, error, geolocationOptions);

  function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	  var radlat1 = Math.PI * lat1/180;
	  var radlat2 = Math.PI * lat2/180;
	  var radlon1 = Math.PI * lon1/180;
	  var radlon2 = Math.PI * lon2/180;
	  var theta = lon1-lon2;
	  var radtheta = Math.PI * theta/180;
	  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	  dist = Math.acos(dist);
	  dist = dist * 180/Math.PI;
	  dist = dist * 60 * 1.1515;
	  if (unit=="K") { dist = dist * 1.609344; }
	  if (unit=="N") { dist = dist * 0.8684; }
	  return dist;
  }

  //TODO: make these walk times more accurate
  //  maybe some trig will do this?
  function calculateWalkTime(distance) {
    // distance in miles
    var walkSpeed = 0.05; // miles per minute
    var walkTime = Math.round(distance/walkSpeed);
    if( walkTime == 0 ) {
      return "Less than a minute walk time.";
    }
    else {
      return walkTime + "ish minute walk time.";
    }
  }

})

;
