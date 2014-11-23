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
