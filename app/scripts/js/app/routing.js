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
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    })
    .state('projects', {
      url: "/projects",
      templateUrl: "views/projects.html",
      controller: "projectsCtrl"
    })
    .state('login', {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "loginCtrl"
    })
    .state('users', {
      url: "/users",
      templateUrl: "views/users.html",
      controller: "usersCtrl"
    })
    .state('tasks', {
      url: "/tasks/:id",
      templateUrl: "views/tasks.html",
      controller: "tasksCtrl"
    });
});
