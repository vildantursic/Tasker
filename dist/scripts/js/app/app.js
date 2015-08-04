var app = angular.module('app', ['ui.router','ngMaterial'])


app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
      $mdSidenav(navID)
      .toggle()
    },300);
    return debounceFn;
  }
})
app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav) {
  $scope.close = function () {
    $mdSidenav('left').close();
  };
});
