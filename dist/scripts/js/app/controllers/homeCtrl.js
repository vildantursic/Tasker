var app = angular.module('app');

var url = "http://192.168.0.3:8080/";

app.controller('homeCtrl', function ($scope, $http) {

  $scope.options = {
    "chart": {
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      "type": "pieChart",
      "height": 500,
      "showLabels": true,
      "transitionDuration": 500,
      "labelThreshold": 0.01,
      "legend": {
        "margin": {
          "top": 5,
          "right": 35,
          "bottom": 5,
          "left": 0
        },
        "dispatch": {},
        "width": 400,
        "height": 20,
        "align": true,
        "rightAlign": true,
        "padding": 32,
        "updateState": true,
        "radioButtonMode": false,
        "expanded": false,
        "vers": "classic"
      },
      "dispatch": {},
      "pie": {
        "dispatch": {},
        "arcsRadius": [],
        "width": 500,
        "height": 500,
        "showLabels": true,
        "title": false,
        "titleOffset": 0,
        "labelThreshold": 0.02,
        "id": 2314,
        "endAngle": false,
        "startAngle": false,
        "padAngle": false,
        "cornerRadius": 0,
        "donutRatio": 0.5,
        "labelsOutside": false,
        "labelSunbeamLayout": false,
        "donut": false,
        "growOnHover": true,
        "pieLabelsOutside": false,
        "donutLabelsOutside": false,
        "margin": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "labelType": "key"
      },
      "tooltip": {
        "duration": 0,
        "gravity": "w",
        "distance": 25,
        "snapDistance": 0,
        "classes": null,
        "chartContainer": null,
        "fixedTop": null,
        "enabled": true,
        "hideDelay": 400,
        "headerEnabled": false,
        "position": {
          "left": null,
          "top": null
        },
        "offset": {
          "left": 0,
          "top": 0
        },
        "hidden": true,
        "data": null,
        "tooltipElem": null,
        "id": "nvtooltip-87994"
      },
      "arcsRadius": [],
      "width": 500,
      "title": false,
      "titleOffset": 0,
      "endAngle": false,
      "startAngle": false,
      "padAngle": false,
      "cornerRadius": 0,
      "donutRatio": 0.5,
      "labelsOutside": true,
      "labelSunbeamLayout": false,
      "donut": true,
      "growOnHover": true,
      "pieLabelsOutside": true,
      "donutLabelsOutside": false,
      "margin": {
        "top": 30,
        "right": 20,
        "bottom": 20,
        "left": 20
      },
      "labelType": "key",
      "noData": null,
      "showLegend": true,
      "legendPosition": "top",
      "defaultState": null,
      "tooltips": true,
      "duration": 250
    },
    "title": {
      "enable": false,
      "text": "Write Your Title",
      "className": "h4",
      "css": {
        "width": "500px",
        "textAlign": "center"
      }
    },
    "subtitle": {
      "enable": false,
      "text": "Write Your Subtitle",
      "css": {
        "width": "500px",
        "textAlign": "center"
      }
    },
    "caption": {
      "enable": false,
      "text": "Figure 1. Write Your Caption text.",
      "css": {
        "width": "500px",
        "textAlign": "center"
      }
    },
    "styles": {
      "classes": {
        "with-3d-shadow": true,
        "with-transitions": true,
        "gallery": false
      },
      "css": {}
    }
  };

  $scope.data = [
    {
      key: "One",
      y: 5
    },
    {
      key: "Two",
      y: 11
    },
    {
      key: "Three",
      y: 23
    },
    {
      key: "Four",
      y: 7
    },
    {
      key: "Five",
      y: 4
    },
    {
      key: "Six",
      y: 33
    },
    {
      key: "Seven",
      y: .5
    }
  ];

  /*Finance graph*/

  $scope.financeOptions = {
    chart: {
      type: 'bulletChart',
      transitionDuration: 500
    }
  };

  $scope.financeData = {
    "title": "Revenue",
    "subtitle": "US$, in thousands",
    "ranges": [150,225,300],
    "measures": [220],
    "markers": [250]
  }


});
