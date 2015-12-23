var app = angular.module('app');

app.controller('tasksCtrl', ['$scope', '$mdDialog', '$http', 'myHttp', '$timeout', '$q', '$log', '$state', 'myPopup', 'myDialog', function ($scope, $mdDialog, $http, myHttp, $timeout, $q, $log, $state, myPopup, myDialog) {

    $scope.minDate = new Date();

    $scope.parent_project = $state.params.id;

    // loading screen
    $scope.status = true;

    $scope.change = function () {
        $scope.status = false;
    };
    // **************

    // myHttp($scope, {method: 'GET', url: 'api/v1/wh/tasks?parent_project=' + $scope.parent_project});
    $scope.object = {};

    var httpParameters = {
        method: "GET",
        url: "http://localhost:7001/api/v1/wh/tasks?parent_project=" + $scope.parent_project,
        async: true,
        crossDomain: true,
        dataType: "jsonp",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };

    $http(httpParameters).success(function(data){
        // $scope.object = data;
        for(var obj in data){
          var subtasks = [];

          var id = data[obj].id;

            for(var sub in data){
              if(id == data[sub].parent_task){
                data[sub].sub = "sub-task";
                subtasks.push(data[sub]);
                delete data[sub];
              }
            }
            data[obj].subtask = subtasks;
        }
        $scope.object = data;
        // console.log($scope.object);
        $scope.change();
    }).error(function(data){
        console.log(data);
        $state.go("404");
    });

    //$scope.addTaskDialog = function(event, dialogName){
    //
    //    myDialog(event, dialogName, $scope, function(){
    //
    //        myHttp($scope, {method: 'POST', url: 'api/v1/wh/tasks'}, $scope.addTask);
    //
    //        myPopup('Task is added');
    //    });
    //};

    $scope.addTaskDialog = function (ev) {

        $mdDialog.show({
            controller: 'tasksCtrl',
            scope: $scope.$new(),
            templateUrl: 'views/partials/dialogs/addTaskDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev
        }).then(function (answer) {

        }, function () {
            console.log('You cancelled the dialog.');
        });
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        if (answer == "save") {
            $scope.addTask.parent_project = $state.params.id;

            myHttp($scope, {method: 'POST', url: 'api/v1/wh/tasks'}, $scope.addTask);
        }
        $mdDialog.hide(answer);
    };

    $scope.object = '';

    //Pagination
    $scope.currentPage = 0;
    $scope.pageSize = 10;

    $timeout(function () {
        $scope.numberOfPages = function () {
            return Math.ceil($scope.object.length / $scope.pageSize);
        };

    }, 1000);

}]);
