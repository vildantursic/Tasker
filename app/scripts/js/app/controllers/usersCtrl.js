var app = angular.module('app');

app.controller('usersCtrl', ['$scope', '$mdDialog', '$http', '$mdToast', 'myHttp', '$animate', '$state', function ($scope, $mdDialog, $http, $mdToast, myHttp, $animate, $state) {

    // loading screen
    $scope.change = function () {
        $scope.status = false;
    };
    // ******************

    //myHttp($scope, {method: 'GET', url: 'api/v1/users'});

}]);
