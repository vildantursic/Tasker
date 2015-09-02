var app = angular.module('app');

var url = "http://192.168.0.3:8080/";

app.controller('usersCtrl', function ($scope, $mdDialog, $http, $mdToast, $animate, $state) {

  //TOAST MESSAGE SHOW
  $scope.showSimpleToast = function (message) {
    $mdToast.show(
        $mdToast.simple()
            .content(message)
            .position(getToastPosition())
            .hideDelay(3000)
    );
  };

  // loading screen
  $scope.status = true;

  $scope.change = function (){
    $scope.status = false;
  }
  // ******************


  var req = {
    method: 'GET',
    url: url + 'api/v1/users',
    async: true,
    crossDomain: true,
    dataType: "jsonp",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  $http(req).success(function(data){

    $scope.users = data.rows;
    $scope.change();

  }).error(function(){
    $state.go("404");
  });



  $scope.addUserDialog = function(ev) {
    $mdDialog.show({
      controller: 'usersCtrl',
      scope: $scope.$new(),
      templateUrl: 'views/partials/addUserDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev
    }).then(function(answer) {

      }, function() {
        console.log('You cancelled the dialog.');
      });
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    if(answer == "save"){

      var post = {
        method: 'POST',
        url: url + 'api/v1/users',
        data: { user: $scope.addUser },
        async: true,
        crossDomain: true,
        dataType: "jsonp",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };

      $http(post).success(function(data){
        console.log(data);
        $scope.showSimpleToast("Success");
      }).error(function(){
        $scope.showSimpleToast("Adding failed");
      });

    }
    $mdDialog.hide(answer);
  };

});
