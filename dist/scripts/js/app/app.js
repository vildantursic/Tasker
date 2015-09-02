var app = angular.module('app', ['ui.router','ngMaterial', 'nvd3', 'ngStorage']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('red');
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

//getting ip address
$.get("http://ipinfo.io", function(response) {
  console.log(response);
}, "jsonp");

//TOAST MESSAGE DEFINING
var toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
};
function getToastPosition() {
    return Object.keys(toastPosition)
        .filter(function (pos) {
            return toastPosition[pos];
        })
        .join(' ');
};