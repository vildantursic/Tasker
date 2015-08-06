var app = angular.module('app');

app.controller('taskCtrl', function ($scope, $mdDialog, $http, $stateParams) {

  $scope.showEditTask = function(ev) {
    $mdDialog.show({
      controller: DialogController,
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

  var get = {
    method: 'GET',
    url: 'http://localhost:8080/api/pos',
    async: true,
    crossDomain: true,
    dataType: "jsonp",
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    }
  }
  getTasks();

  $scope.deleteTask = function(id){

    var del = {
      method: 'DELETE',
      url: 'http://localhost:8080/api/pos/'+ id,
      async: true,
      crossDomain: true,
      dataType: "jsonp",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": "*"
      }
    }

    $http(del).success(function(){
      console.log("Task deleted");
    }).error(function(){
      alert("Failed");
    });

    getTasks();
  }

  function getTasks(){

    $http(get).success(function(data){
      //console.log(data);
      $scope.tasks = data;
    }).error(function(){
      alert("Failed");
    });

  }

});
