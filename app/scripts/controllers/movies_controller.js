(function(){
  angular.module('MovieSnob')

    .controller('MoviesController',
      ['moviesFactory','$scope','$rootScope', '$location',
      function(moviesFactory, $scope, $rootScope, $location){

        moviesFactory.getMovies().then( function (results) {
          $scope.movies = results;
        })

        $scope.addMovie = function(movie){
          moviesFactory.addMovie(movie);
          $rootScope.$on('movie:added', function (){
            $location.path('/');
          });
        }



  }]);
}());
