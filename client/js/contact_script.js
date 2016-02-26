myapp.factory('contactFactory', function($http, $location) {
        var factory = {};
        factory.addContact = function(info, callback){
            $http.post('/add_contact', info).success(function (output){
                callback(output);
            })
        }
        factory.getContacts = function(info, callback){
        	$http.post('/get_contacts', info).success(function (output){
        		callback(output);
        	})
        }
        factory.findContacts = function (info, callback){
            $http.post('/findcontacts', info).success(function (output){
                callback(output);
            })
        }
        return factory;
    });

myapp.controller('contactController', function($scope, requestFactory, contactFactory, $location, $rootScope) {
    

})