var app = angular.module('app', ['ngMaterial', 'ngMessages', 'ui.router', 'nvd3', 'ngStorage']);

//var url = "http://77.78.198.112:38080/";
var url = "http://localhost:7001/";
// var url = "http://tm.tiimiss.globalgps.ba:81/";

//theme for application
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});

///////////////////////
// Getting ip address
///////////////////////

$.get("http://ipinfo.io", function(response) {
  //console.log(response);
}, "jsonp");

/////////////////
// Toast message
/////////////////

app.factory('myPopup', function($rootScope, $mdToast){

    //TOAST MESSAGE DEFINING
    var toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    function getToastPosition() {
        return Object.keys(toastPosition)
            .filter(function (pos) {
                return toastPosition[pos];
            })
            .join(' ');
    }

    //TOAST MESSAGE SHOW
    return function (message) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position(getToastPosition())
                .hideDelay(3000)
        );
    };

});

/////////////////////////
// Pagination filter
/////////////////////////

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

//////////////////
// Http request
//////////////////

app.service('myHttp', ['$http', '$state', function($http, $state){

    return function ($scope, httpParams, data){

        // loading screen
        $scope.status = true;

        $scope.change = function () {
            $scope.status = false;
        };
        // **************

        console.log(data);
        var httpParameters = {
            method: httpParams.method,
            url: url + httpParams.url,
            async: true,
            crossDomain: true,
            data: data,
            dataType: "jsonp",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };

        $http(httpParameters).success(function(data){
            if(httpParams.method == 'GET'){
                $scope.object = data;
                $scope.change();
            }
            else if(httpParams.method == 'POST'){
                console.log(data);
                $state.reload();
            }
            else if(httpParams.method == 'PUT'){
                console.log(data);
                $state.reload();
            }
            else if(httpParams.method == 'DELETE'){
                console.log(data);
                $state.reload();
            }
        }).error(function(data){
            if(httpParams.method == 'GET'){
                console.log(data);
                $state.go("404");
            }
            else if(httpParams.method == 'POST'){
                console.log(data);
            }
            else if(httpParams.method == 'PUT'){
                console.log(data);
            }
            else if(httpParams.method == 'DELETE'){
                console.log(data);
            }
        });

    }

}]);

//////////////////
// Dialog popup
//////////////////

app.factory('myDialog', function($mdDialog){

    function DialogController($scope, $mdDialog) {

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

    return function (ev, dialogName, $scope, cb) {

        $mdDialog.show({
            controller: DialogController,
            scope: $scope.$new(),
            templateUrl: 'views/partials/dialogs/'+ dialogName +'.html',
            parent: angular.element(document.body),
            targetEvent: ev
        }).then(function (answer) {
            if(answer == 'save' || answer == 'yes'){
                cb($scope);
            }
            else if(answer == 'cancel' || answer == 'no'){
                console.log('quit');
            }
        }, function () {
            console.log('You cancelled the dialog.');
        });
    }

});

// unique filter
app.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});

///////////////////////
// Socket.io
//////////////////////

app.factory('socket', function ($rootScope) {
   var socket = io.connect(url);
   return {
       on: function (eventName, callback) {
           socket.on(eventName, function () {
               var args = arguments;
               $rootScope.$apply(function () {
                   callback.apply(socket, args);
               });
           });
       },
       emit: function (eventName, data, callback) {
           socket.emit(eventName, data, function () {
               var args = arguments;
               $rootScope.$apply(function () {
                   if (callback) {
                       callback.apply(socket, args);
                   }
               });
           })
       }
   };
});
