var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('projects', {
      url: "/projects",
      templateUrl: "views/projects.html",
      controller: "projectCtrl"
    })
    .state('tasks', {
      url: "/tasks/:id",
      templateUrl: "views/tasks.html",
      controller: "taskCtrl"
    });
});
