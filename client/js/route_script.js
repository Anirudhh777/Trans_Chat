var myapp = angular.module('TransChat_app', ['ngRoute', 'ngMessages', 'ngCookies']);
	myapp.config(function ($routeProvider) {
		$routeProvider
		.when('/',{     
                templateUrl: 'partials/login.html'
            })
			.when('/dashboard',{
                templateUrl: 'partials/dashboard.html'
            })
            .when('/messages', {
                templateUrl: 'partials/messages.html'
            })
            .otherwise({
              redirectTo: '/'
            });
    });