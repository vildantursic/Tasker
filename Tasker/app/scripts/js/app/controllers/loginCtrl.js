var app = angular.module('app');

app.controller('loginCtrl', function ($scope, $mdDialog, $http, $stateParams, $state, $rootScope) {


  if ($state.is('login')) {
    console.log("well it is");
  }

});
