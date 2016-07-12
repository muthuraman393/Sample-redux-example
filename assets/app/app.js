var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngDragDrop','ngResource']);

app
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/home', {
                    title: 'Home',
                    templateUrl: 'assets/partials/section.html',
                    controller: 'navCtrl',
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }
    ])

.run(function($rootScope, $route, $location) {

    $rootScope.$on("$routeChangeStart", function(event, next, current) {


    });

    $rootScope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});