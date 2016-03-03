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

myapp.controller('userController', function($scope, userFactory, $location, $rootScope, contactFactory) {
        $scope.addUser = function() {
            delete $rootScope.reqMessage;    
            var user_repack ={
                name: $scope.new_user.name,
                email: $scope.new_user.email,
                phone: $scope.new_user.phone,
                password: $scope.new_user.password,
                created_at: new Date()
            }
            userFactory.addUser(user_repack, function (data) {
                    var dataType = typeof data;
                    console.log(dataType);
                    if(dataType === "object"){
                        $rootScope.users = data;
                        $rootScope.welcome = "Thank you Registering"
                        contactFactory.getContacts(data, function (data){
                            $rootScope.userContacts = data;
                        })
                        $location.path('/dashboard')
                    }if(dataType === "string"){
                        $rootScope.invalid = data;
                        $location.path('/dashboard')
                    }
            });
        }
        $scope.findUser = function(user) {
            delete $rootScope.reqMessage;
            delete $rootScope.findusers
            delete $rootScope.existingContact
            var reqMessage = false;
            var userRequests = user.requests
            var userContacts = user.contacts
            var repack = {
                email: $scope.find_user.find
            }
            userFactory.findUser(repack, function (data) {
                if(userContacts.length === 0 && user.requests.length === 0){
                    $rootScope.findusers = data
                }else{
                    for(var i=0;i<userContacts.length;i++){
                        if(userContacts[i]._User == data._id){
                            $rootScope.existingContact = "User is already a Contact"
                            reqMessage = true;
                        }
                    }
                    for(var j=0;j<userRequests.length;j++){
                        if(userRequests[j].req_to_id == data._id || userRequests[j].req_from_id == data._id){
                            $rootScope.existingContact = "You have a pending " + userRequests[j].status + " request with" + " " + data.name
                            reqMessage = true;
                        }
                    }
                }
                if(reqMessage === false){
                    $rootScope.findusers = data
                    console.log($rootScope.findusers);
                }
            })
            $scope.find_user = {}
        }
})