var app = angular.module('app');

app.controller('tasksCtrl', function ($scope, $mdDialog, $http, $stateParams, $state) {

  // loading screen
  $scope.status = true;

  $scope.change = function (){
    $scope.status = false;
  }
  // ******************

  $scope.request = function (){

    $http(get).success(function(data){
      //console.log(data);
      $scope.tasks = data.rows;
      $scope.change();
    }).error(function(){
      alert("Failed");
    });

  }

  var get = {
    method: 'GET',
    url: 'http://192.168.0.3:8080/api/pg/tasks',
    async: true,
    crossDomain: true,
    dataType: "jsonp",
    headers: {
      //"Access-Control-Allow-Headers": "Content-Type",
      //"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    }
  }
  $scope.request(get);

  $scope.deleteTask = function(id){

    var del = {
      method: 'DELETE',
      url: 'http://192.168.0.3:8080/api/pos/'+ id,
      async: true,
      crossDomain: true,
      dataType: "jsonp",
      headers: {
        //"Access-Control-Allow-Headers": "Content-Type",
        //"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": "*"
      }
    }

    $http(del).success(function(){
      console.log("Task deleted");
    }).error(function(){
      alert("Failed");
    });

    //$scope.request(get);

    setTimeout(function(){
      //$window.location.reload();
      $state.reload();
    }, 2000);

  }

  $scope.showEditTask = function(ev, id) {

    for (var i = 0; i < $scope.tasks.length; i++) {
      angular.forEach($scope.tasks[i], function(value, key) {
          if(value == id){
            $scope.taskEdit = $scope.tasks[i];
          }
      });
    }

    $mdDialog.show({
      controller: DialogController,
      scope: $scope.$new(),
      templateUrl: 'views/partials/editTaskDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
    })
    .then(function(answer) {
      console.log('You chose "' + answer + '".');
    }, function() {
      console.log('You cancelled the dialog.');
    });
  };

  $scope.showDeleteTask = function(ev, id) {

    for (var i = 0; i < $scope.tasks.length; i++) {
      angular.forEach($scope.tasks[i], function(value, key) {
          if(value == id){
            $scope.taskEdit = $scope.tasks[i];
          }
      });
    }

    $mdDialog.show({
      controller: DialogController,
      scope: $scope.$new(),
      templateUrl: 'views/partials/deleteTaskDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
    })
    .then(function(answer) {
      if(answer == "yes"){
        $scope.deleteTask($scope.taskEdit._id);
      }
    }, function() {
      console.log('You cancelled the dialog.');
    });
  };

});

app.config( function($mdThemingProvider){
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('docs-dark', 'default')
  .primaryPalette('blue')
  .dark();
});
