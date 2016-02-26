myapp.factory('requestFactory', function($http, $location) {
        var factory = {};
        
        factory.sendRequest = function(info, callback) {
            $http.post('/request', info).success(function (output){
                callback(output);
            })
        }
        factory.getRecievedRequests = function(info, callback) {
            $http.post('/get_requests', info).success(function (output){
                callback(output);
            })
        }
        return factory;
    });
myapp.controller('requestController', function($scope, requestFactory, contactFactory, $location, $rootScope) {
    $scope.sendRequest = function(info, data, infoname, dataname) {
        var request_repack = {
            send_id: data,
            send_name: dataname,
            send_status:"Sent",
            recieved_id: info,
            recieved_name: infoname,
            recieved_status:"Recieved"
        }
        requestFactory.sendRequest(request_repack, function (data){
            $rootScope.findrequests = data
        })
    }
    $scope.acceptRequest = function(userId, userName, requestId, reqFromId, contactName){
        var contact_repack = {
            userId: userId,
            userName: userName,
            reqFromId: reqFromId,
            reqFromName: contactName,
            requestId: requestId,
            created_at: new Date()
        }
        contactFactory.addContact(contact_repack, function (data){
            $rootScope.users = data
            delete $rootScope.recievedRequests
            requestFactory.getRecievedRequests(data, function (info){
                if(info.length > 0){
                    $rootScope.recievedRequests = info;
                }
                })
            contactFactory.findContacts($rootScope.users, function (data){
            contactFactory.getContacts(data, function (data){
                $rootScope.userContacts = data;
            })
            })
            $location.path('/dashboard')
        })
        }
});

