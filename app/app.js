/*jslint browser: true*/
/*global $, angular, alert*/

(function () {
  'use strict';

  var app = angular.module("app", []);
    
  app.controller("aboutCtrl", ["$scope", "$http", "mobileCheck",
    //create the content for the about section
    function ($scope, $http, mobileCheck) {
      $http.get('data/about.json').
        then(function (response) {
          $scope.about = response.data;
        });

      //check to see if page is in mobile view to know whether to show the 2nd paragraph
      $scope.isMobile = mobileCheck;
    }]);
  
  app.controller("workCtrl", ["$scope", "$http", "mobileCheck",
    //create the content for the work section
    function ($scope, $http, mobileCheck) {
      $http.get("data/work.json").
        then(function (response) {
          $scope.work = response.data;

        //organize into groups for the bootstrap rows
          var i,
            temp,
            columnCount = 3;
          $scope.rows = [];

          for (i = 0; i < $scope.work.projects.length; i += columnCount) {
            temp = {};
            temp.columns = $scope.work.projects.slice(i, i + columnCount);
            $scope.rows.push(temp);
          }
          //check to see if page is in mobile view to know whether to show the grid or carousel
          $scope.isMobile = mobileCheck;
        });
    }]);
  
  app.controller("contactCtrl", ["$scope", "$http",
    function ($scope, $http) {
      //create the content for the work section
      $http.get("data/contact.json").
        then(function (response) {
          $scope.contact = response.data;
        });
    }]);
  
  app.factory("mobileCheck",
    function () {
      return $("#hide-on-mobile").css("display") === "none";
    });
  
}());
