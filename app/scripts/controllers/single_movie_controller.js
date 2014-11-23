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
