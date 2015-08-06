var app = angular.module('app');

app.controller('projectCtrl', function ($scope, $mdDialog, $http) {

    var req = {
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

    $http(req).success(function(data){
      //console.log(data);
      $scope.projects = data;
    }).error(function(){
      alert("Failed");
    });


  $scope.showEditProject = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/partials/editProjectDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
    })
    .then(function(answer) {
      console.log('You chose "' + answer + '".');
    }, function() {
      console.log('You cancelled the dialog.');
    });
  };

})
