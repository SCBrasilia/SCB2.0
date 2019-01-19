angular.module('SCB', ['ngRoute']).config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: '/vendor/pages/main.html'
    }).otherwise({redirectTo: '/'});
});