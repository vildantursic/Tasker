/**
 * Created by Vildan on 8/27/2015.
 */
'use strict';
var app = angular.module('app');

app.directive('taskBox', function() {
    return {
        restrict: 'E',
        scope: {
            task: '='
        },
        replace: true,
        controller: 'taskEditCtrl',
        templateUrl: 'views/partials/directives/taskBox.html'
    };
});

app.controller('taskEditCtrl', function($scope, $mdDialog){

    //EDIT
    $scope.showEditTask = function(ev, task) {

        $scope.taskEdit = task;

        $mdDialog.show({
            controller: DialogController,
            scope: $scope.$new(),
            templateUrl: 'views/partials/dialogs/editTaskDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
        })
            .then(function(answer) {
                console.log('You chose "' + answer + '".');
            }, function() {
                console.log('You cancelled the dialog.');
            });
    };

    //DELETE
    $scope.deleteTask = function(id){

        var del = {
            method: 'DELETE',
            url: url +  'api/v1/tasks/'+ id,
            async: true,
            crossDomain: true,
            dataType: "jsonp",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        $http(del).success(function(){
            console.log("Task deleted");
        }).error(function(){
            alert("Failed");
        });

    };

    $scope.showDeleteTask = function(ev, task) {

        $scope.taskDelete = task;

        $mdDialog.show({
            controller: DialogController,
            scope: $scope.$new(),
            templateUrl: 'views/partials/dialogs/deleteTaskDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev
        })
            .then(function(answer) {
                if(answer == "yes"){
                    $scope.deleteTask($scope.taskDelete.id);
                }
            }, function() {
                console.log('You cancelled the dialog.');
            });
    };

});