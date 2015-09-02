var app = angular.module('app');

var url = "http://77.78.198.112:38080/";

app.controller('tasksCtrl', function ($scope, $mdDialog, $http) {

  $scope.taskAddResult = function () {
    console.log($scope.taskAdd);
  };

  // loading screen
  $scope.status = true;

  $scope.change = function (){
    $scope.status = false;
  };
  // ******************

  $scope.request = function (){

    $http(get).success(function(data){

        $scope.tasks = data.rows;

        $scope.change();
    }).error(function(){
      $state.go("404");
    });

  };

  var get = {
    method: 'GET',
    url: url + 'api/v1/tasks',
    async: true,
    crossDomain: true,
    dataType: "jsonp",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  $scope.request();

  //ADD
  $scope.showAddTask = function(ev) {

    $mdDialog.show({
      controller: DialogController,
      scope: $scope.$new(),
      templateUrl: 'views/partials/dialogs/addTaskDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev
    })
        .then(function(answer) {

        }, function() {
          console.log('You cancelled the dialog.');
        });
  };

});