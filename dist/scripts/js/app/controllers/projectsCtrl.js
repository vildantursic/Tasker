var app = angular.module('app');

app.controller('projectsCtrl', ['$scope', '$mdDialog', '$http', 'myHttp', '$timeout', 'myDialog', 'myPopup', 'socket', function ($scope, $mdDialog, $http, myHttp, $timeout, myDialog, myPopup, socket) {

    myHttp($scope, {method: 'GET', url: 'api/v1/wh/projects'});

    //$scope.addProjectDialog = function(event, dialogName){
    //
    //    myDialog(event, dialogName, $scope, function($scope){
    //
    //        console.log($scope);
    //
    //        myHttp($scope, {method: 'POST', url: 'api/v1/wh/projects'}, $scope.addProject);
    //
    //        myPopup('Project is added');
    //    });
    //};

    socket.on('project', function(data){
        console.log('project created');
    });

    //SHOW ADD DIALOG
    $scope.addProjectDialog = function (ev) {

        $mdDialog.show({
            controller: 'projectsCtrl',
            scope: $scope.$new(),
            templateUrl: 'views/partials/dialogs/addProjectDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev
        }).then(function(answer){

            },
            function () {
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
            myHttp($scope, {method: 'POST', url: 'api/v1/wh/projects'}, $scope.addProject);
        }
        $mdDialog.hide(answer);
    };

    $scope.object = '';

    //Pagination
    $scope.currentPage = 0;
    $scope.pageSize = 9;
    $timeout(function(){
        $scope.numberOfPages=function(){
            return Math.ceil($scope.object.length / $scope.pageSize);
        };
    },1000);

}]);
