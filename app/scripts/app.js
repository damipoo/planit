'use strict';

/**
 * @ngdoc overview
 * @name planItApp
 * @description
 * # planItApp
 * Main module of the application.
 */
angular
  .module('planItApp', [
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ngAnimate',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($httpProvider, $locationProvider, $routeProvider, authProvider, jwtInterceptorProvider) {
    authProvider.init({
      domain: 'damipoo.auth0.com',
      clientID: 'Bw0864Tnh8fH7VytID8p3rhS04yUJ2Xx'
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function($location, $rootScope, auth, jwtHelper, store) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();
    $rootScope.$on('$locationChangeStart', function() {
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
            $rootScope.setupUser();
          } else {
            $location.path('/login');
          }
        } else {
          $location.path('/login');
        }
      }
    });

    $rootScope.setupUser = function () {
      $rootScope.authenticated = auth.isAuthenticated;
      $rootScope.nickname      = auth.isAuthenticated ? auth.profile.nickname : '';
    };

    $rootScope.login = function () {
      auth.signin({authParams: {scope: 'openid name email picture'}}, function(profile, token) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);

        // reload the scope, once we log the user in
        $rootScope.setupUser();
        $location.path('/boards');
      }, function() {
        // Error callback
        console.log(arguments);
      });
    };

    $rootScope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $rootScope.setupUser();
    };
  });
