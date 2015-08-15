var app = angular.module('app', ['ui.router','ngMaterial', 'nvd3'])

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
})

app.controller('statusCtrl', ['$scope', '$interval', function($scope, $interval) {
  $scope.mode = 'query';
  $scope.determinateValue = 30;
  $scope.determinateValue2 = 30;
  $interval(function() {
    $scope.determinateValue = 60;
  }, 100, 0, true);
  $interval(function() {
    $scope.mode = ($scope.mode == 'query' ? 'determinate' : 'query');
  }, 7200, 0, true);
}]);

app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.name = "Vildan";

  $scope.close = function () {
    $mdSidenav('left').close();
  };
});

function DialogController($scope, $mdDialog) {

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
