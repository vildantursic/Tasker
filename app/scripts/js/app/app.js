var app = angular.module('app', ['ui.router','ngMaterial'])

app.config(function($mdThemingProvider) {
})

app.controller('statusCtrl', ['$scope', '$interval', function($scope, $interval) {
  $scope.mode = 'query';
  $scope.determinateValue = 30;
  $scope.determinateValue2 = 30;
  $interval(function() {
    $scope.determinateValue += 1;
    $scope.determinateValue2 += 1.5;
    if ($scope.determinateValue > 100) {
      $scope.determinateValue = 30;
      $scope.determinateValue2 = 30;
    }
  }, 100, 0, true);
  $interval(function() {
    $scope.mode = ($scope.mode == 'query' ? 'determinate' : 'query');
  }, 7200, 0, true);
}]);

app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.name = "Vildan";

  $scope.close = function () {
    $mdSidenav('right').close();
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
