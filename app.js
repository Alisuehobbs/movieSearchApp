'use strict';

const app = angular.module("movieSearchApp", ['ngRoute'])

app.controller("MoviesController", function($scope, $http, $location) {

    $scope.submitSearch = function(searchTerm) {
        $http.get(`http://www.omdbapi.com/?s=${searchTerm}`).then(function(object) {
            $scope.movies = object.data.Search;
            $location.url('/movies')
        })
    }
})

app.controller("MovieController", function ($scope, $http, $location, $routeParams, $log) {
  const id = $routeParams.id;

    $http.get(`http://www.omdbapi.com/?i=${id}`).then((movie) => {
      $scope.movie = movie.data
    })
})

app.config(function($routeProvider) {
    $routeProvider
        .when('/movies', {
            templateUrl: './views/movies.html',
            controller: 'MoviesController'
        })
        .when('/movie/:id', {
            templateUrl: './views/movie.html',
            controller: 'MovieController'
        })
});
