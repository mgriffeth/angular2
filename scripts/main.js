(function(){
  var app = angular.module('MovieSnob',['ngRoute','restangular']);

    app.config(function( $routeProvider, RestangularProvider){

      RestangularProvider.setBaseUrl('http://tiy-atl-fe-server.herokuapp.com/collections/');

        RestangularProvider.setRestangularFields({
        id: '_id'

        });

      $routeProvider.when('/',{
        templateUrl: 'templates/home.html',
        controller: 'MoviesController'
      });

      $routeProvider.when('/add',{
        templateUrl:'templates/add-movie.html',
        controller: 'MoviesController'
      });

      // $routeProvider.when('/single/:movieId',{
      //   templateUrl:'templates/single-movie.html',
      //   controller: 'SingleMovieController'
      // });

      $routeProvider.when('/edit/:movieId',{
        templateUrl:'templates/edit-movie.html',
        controller: 'SingleMovieController'
      });

    });
}());

(function(){
  angular.module('MovieSnob')
    .factory('moviesFactory',
      ['$rootScope','Restangular', function( $rootScope, Restangular ){

    var movieLibrary = Restangular.all('moviesnob');


    function getMovies(){
      return movieLibrary.getList();
    }

    function getMovie(id){
      return movieLibrary.get(id);

    }

    function addMovie(movie){
      console.log(movie);
      movieLibrary.post(movie).then(function(){
        $rootScope.$broadcast('movie:added');
      });
    }

    function editMovie(id){
      movie.put().then(function(){
        $rootScope.$broadcast('movie:updated');
      });
    }

    function deleteMovie(movie){
      movie.remove().then(function(){
        $rootScope.$broadcast('movie:deleted')
      });
    }

    return{

      getMovies: getMovies,
      getMovie: getMovie,
      addMovie: addMovie,
      editMovie: editMovie,
      deleteMovie: deleteMovie

    };
  }]);
}());

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

(function(){
  angular.module('MovieSnob')

    .controller('SingleMovieController',

    ['moviesFactory','$scope','$rootScope','$location','$routeParams',

    function ( moviesFactory, $scope, $rootScope, $location, $routeParams) {

      moviesFactory.getMovie($routeParams.id).then(function (results) {

        $scope.movie = results;

      });




    }]);
}());
