var app = angular.module('app');

var url = "http://192.168.0.3:8080/";

app.controller('projectsCtrl', function ($scope, $mdDialog, $http, $state, $window, $mdToast, $animate, $timeout) {

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    // loading screen
    $scope.status = true;

    $scope.change = function () {
        $scope.status = false;
    }
    // ******************

    $scope.request = function (req) {

        $http(req).success(function (data) {
            $scope.projects = data.rows;
            $scope.change();
        }).error(function () {
            $state.go("404");
        });

    };

    var get = {
        method: 'GET',
        url: url + 'api/v1/projects',
        async: true,
        crossDomain: true,
        dataType: "jsonp",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };

    $scope.request(get);

    $scope.addProject = function (data) {

        console.log(data);

        var post = {
            method: 'POST',
            url: url + 'api/v1/projects',
            async: true,
            crossDomain: true,
            data: {name: data.name, status: data.status, email: data.email},
            dataType: "jsonp",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        $http(post).success(function (data) {
            //
            $scope.showSimpleToast();
        }).error(function () {
            alert("Failed");
        });

        $scope.request(get);

    };


//SHOW ADD DIALOG
    $scope.showAddProject = function (ev) {

        $mdDialog.show({
            controller: 'tasksCtrl',
            scope: $scope.$new(),
            templateUrl: 'views/partials/dialogs/addProjectDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev
        })
            .then(function(answer){

            },
            function () {
                console.log('You cancelled the dialog.');
            });
    };


});

app.config(function ($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('blue')
        .dark();
});

//p_project_id, p_object_type, p_creation_date, p_creation_user, p_creation_ip, p_context_id, p_project_name, p_project_nr, p_project_path, p_parent_id, p_company_id, p_project_type_id, p_project_status_id
