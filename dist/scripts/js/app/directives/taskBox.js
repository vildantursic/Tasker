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

app.controller('taskEditCtrl', [ '$scope', '$mdDialog', 'myHttp', '$state', 'myDialog', 'myPopup' ,function($scope, $mdDialog, myHttp, $state, myDialog, myPopup){

    $scope.hideSubtasks = function(subtask){
      // console.log(subtask);
        for(var t in subtask){
          $("#subtask-"+subtask[t].id).toggle();
        }
    }

    $scope.minDate = new Date();

    //EDIT
    $scope.editTaskDialog = function(event, dialogName, data){

        data.end_time = new Date(data.end_time);

        $scope.editTask = data;

        myDialog(event, dialogName, $scope, function(){
            myHttp($scope, {method: 'PUT', url: 'api/v1/wh/tasks'}, $scope.editTask);

            myPopup('Task is edited');
        });
    };

    //DELETE
    $scope.deleteTaskDialog = function(event, dialogName, data){

        $scope.deleteTask = data;

        myDialog(event, dialogName, $scope, function(){
            myHttp($scope, {method: 'DELETE', url: 'api/v1/wh/tasks/?id=' + $scope.deleteTask.id});

            myPopup('Task is deleted');
        });
    };

}]);
