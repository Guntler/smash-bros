// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCookies'])


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
	  controller: 'MainController'
    })
	
	.state('favorites', {
      url: '/favorites',
      templateUrl: 'templates/pages-favorites.html',
	  controller: 'FavoritesController'
    })
	
	.state('profile', {
      url: '/profile',
      templateUrl: 'templates/pages-profile.html',
	  controller: 'ProfileController'
    })
	
	.state('filters', {
      url: '/filters',
      templateUrl: 'templates/pages-filters.html',
	  controller: 'NavCtrl'
    })
	
	.state('recover', {
      url: '/recover',
      templateUrl: 'templates/pages-recover.html',
	  controller: 'RecoverController'
    })
	
	.state('login', {
      url: '/login',
      templateUrl: 'templates/pages-login.html',
	  controller: 'LoginController'
    })
	
	.state('register', {
      url: '/register',
      templateUrl: 'templates/pages-register.html',
	  controller: 'RegisterController'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');

});