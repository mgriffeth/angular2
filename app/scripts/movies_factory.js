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
