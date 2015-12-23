/**
 * Created by Vildan on 8/27/2015.
 */
'use strict';
var app = angular.module('app');

app.directive('projectBox', function() {
    return {
        restrict: 'E',
        scope: {
            project: '='
        },
        replace: true,
        controller: 'projectsEditCtrl',
        templateUrl: 'views/partials/directives/projectBox.html'
    };
});

app.controller('projectsEditCtrl', function($scope, $http, $mdDialog, $state, $mdToast){


});