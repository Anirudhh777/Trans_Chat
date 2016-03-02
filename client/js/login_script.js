myapp.factory('loginFactory', function($http) {
        var factory = {};
        factory.getUser = function(info, callback) {
            $http.post('/login', info).success(function(output){
                callback(output);
            })
          }
        return factory;
    });
myapp.controller('loginController', function($scope, $rootScope, loginFactory, requestFactory, userFactory, contactFactory, $location, $cookies) {

        $scope.getUser = function(){
            delete $rootScope.reqMessage;
            var user_repack = {
                email: $scope.user.email,
                password: $scope.user.password
            }
            loginFactory.getUser(user_repack, function (data){
                $rootScope.users = data
                $scope.userData = $cookies.userData || {};
                $cookies.userData = data
                console.log($cookies.userData);
                $scope.userCookie = $cookies.userData;
                // var userCookie = $cookies.get('userCookie')
                // $cookies.put('userCookie', data);
            requestFactory.getRecievedRequests(data, function (data){
                    if(data.length > 0){
                    $rootScope.recievedRequests = data;
                }
                })
            contactFactory.getContacts(data, function (data){
                $rootScope.userContacts = data;
            })
                $location.path('/dashboard')
            })
        }

        $scope.logout = function(){
            console.log("Logged out");
            for (var i in $rootScope) {
                if (i.substring(0,1) !== '$') {
                    delete $rootScope[i];
                }
            }
            $location.path('/')
        }
});
