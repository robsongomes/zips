/*global angular*/
angular.module('zipApp')

.config(['$routeProvider', function($routeProvider){
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'ZipIndexController',
        controllerAs: 'zipIndexCtrl'
    })
    
    .when('/new', {
        templateUrl: '/pages/new.html'
    });
    
}])