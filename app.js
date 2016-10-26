'use strict';

const app = angular.module("movieSearchApp", ['ngRoute'])

app.factory("moviesService", moviesService)

app.controller("Controller", ($scope, $http, $location, moviesService) => {

  $scope.submitSearch = function(searchTerm) {
    console.log('searchTerm:', searchTerm);
      $location.url('/movies')
    }
})

app.config(($routeProvider) => {
    $routeProvider
        .when('/movies', {
            templateUrl: 'movies.html',
            controller: 'MovieSearchController'
        })
        .when('/movie', {
            templateUrl: 'movie.html',
            controller: 'MovieController'
        })
});

app.controller("MovieSearchController", ($scope, $http, $location, moviesService) => {

  moviesService.getMovies.then((object) => {
    $scope.movies = object.data.Search;
  })

})

app.controller("MovieController", ($scope, $http) => {
    $scope.showMore = function(movie) {
        $http.get(`http://www.omdbapi.com/?i=${movie.imdbID}`).then((movieObject) => {
            console.log('movieObject.data:', movieObject.data);
            $scope.movieInfo = movieObject.data
        })
    }
})
