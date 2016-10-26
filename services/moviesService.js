function moviesService($http) {

  let service = {}

  moviesService.getMovies = $http.get(`http://www.omdbapi.com/?s=${searchTerm}`)

  return service;
}
