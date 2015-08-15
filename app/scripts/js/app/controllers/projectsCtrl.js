var app = angular.module('app');

var url = "http://192.168.0.3:8080/";

app.controller('projectsCtrl', function ($scope, $mdDialog, $http, $state, $window, $mdToast, $animate) {

  $scope.fruitNames = ['User1', 'User2', 'User3'];
  $scope.readonly = false;

  // loading screen
  $scope.status = true;

  $scope.change = function (){
    $scope.status = false;
  }
  // ******************

  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };
  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .content('You created project!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  $scope.request = function (req) {

    $http(req).success(function(data){
      $scope.projects = data.rows;
      $scope.change();
    }).error(function(){
      alert("Failed");
    });

  }

  var get = {
    method: 'GET',
    url: url + 'api/pg/projects',
    async: true,
    crossDomain: true,
    dataType: "jsonp",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }

  $scope.request(get);

  $scope.addProject = function (data){

    console.log(data);

    var post = {
      method: 'POST',
      url: url + 'api/pos',
      async: true,
      crossDomain: true,
      data: {name: data.name, status: data.status, email: data.email},
      dataType: "jsonp",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }

    $http(post).success(function(data){
      //
      $scope.showSimpleToast();
    }).error(function(){
      alert("Failed");
    });

    $scope.request(get);

  }

  $scope.showEditProject = function(ev, id) {

    for (var i = 0; i < $scope.projects.length; i++) {
      angular.forEach($scope.projects[i], function(value, key) {
        if(value == id){
          $scope.projectEdit = $scope.projects[i];
        }
      });
    }

    $mdDialog.show({
      controller: DialogController,
      scope: $scope.$new(),
      templateUrl: 'views/partials/editProjectDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
    })
    .then(function(answer) {
      //console.log('You chose "' + answer + '".');
      if(answer == "save"){

        console.log()

        var post = {
          method: 'PUT',
          url: url + 'api/pos/' + $scope.projectEdit._id,
          async: true,
          crossDomain: true,
          data: {name: $scope.projectEdit.name, status: $scope.projectEdit.status, email: $scope.projectEdit.email},
          dataType: "jsonp",
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }

        $http(post).success(function(data){
          //
        }).error(function(){
          alert("Failed");
        });

        //$scope.request(get);
        setTimeout(function(){
          //$window.location.reload();
          $state.reload();
        }, 2000);

      }
    }, function() {
      console.log('You cancelled the dialog.');
    });
  };

})

app.config( function($mdThemingProvider){
  // Configure a dark theme with primary foreground yellow
  $mdThemingProvider.theme('docs-dark', 'default')
  .primaryPalette('blue')
  .dark();
});
