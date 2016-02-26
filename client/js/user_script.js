myapp.factory('userFactory', function($http, $location) {
        var factory = {};
        factory.addUser = function(info, callback) {
            $http.post('/create', info).success(function (output){
                callback(output);
            })
          }

          factory.findUser = function (info, callback) {
            $http.post('/find', info).success(function (output) {
                callback(output);
            })
          }
          return factory;
    });

myapp.controller('userController', function($scope, userFactory, $location, $rootScope) {
        $scope.addUser = function() {      
            var user_repack ={
                name: $scope.new_user.name,
                email: $scope.new_user.email,
                phone: $scope.new_user.phone,
                password: $scope.new_user.password,
                created_at: new Date()
            }
            userFactory.addUser(user_repack, function (data) {
                    $scope.users = data;
                    $scope.new_user = {};    
            });
        }

        $scope.findUser = function() {
            var repack = {
                email: $scope.find_user.find
            }
            userFactory.findUser(repack, function (data) {
                $rootScope.findusers = data
                // console.log($rootScope.findusers);
            })
        }
})