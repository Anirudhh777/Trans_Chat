myapp.factory('messageFactory', function($http, $location) {
        var factory = {};
        factory.translateMessage = function(info,lang, callback) {
            var key = "trnsl.1.1.20160218T001401Z.bdfb4d720b87c7c7.830925f6951ed2b6ccf7ee3144bbc742412df4d5"
            var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key + '&text=' +info + '&lang='+lang+'&format=plain';
            $http.get(url).success(function (output){
                callback(output);
            })
        }
        factory.loadChat = function(info, callback){
            $http.post('/loadChat', info).success(function (output){
                callback(output);
            })
        }

        factory.saveMessage = function(info, callback){
            $http.post('/save_message', info).success(function (output){
                callback(output);
            })
        }
        factory.deleteMessage = function(info, callback){
            $http.post('/delete_message', info).success(function (output){
                callback(output);
            })
        }
        return factory;
    });

myapp.controller('messageController', function($scope, messageFactory, $location, $rootScope) {
        $scope.sendMessage = function(userId, userName, contactId, contactName){
            var oMessage = $scope.message.msg;
            messageFactory.translateMessage($scope.message.msg,$scope.message.language1, function (data){
            $rootScope.transMsg = data;
            message_repack = {
                userId: userId,
                userName : userName,
                contactId: contactId,
                contactName: contactName,
                tMessage: data.text[0],
                oMessage: oMessage,
                created_at: new Date()
            }
            console.log(message_repack);
            messageFactory.saveMessage(message_repack, function (data){
                $rootScope.messages = data;
            messageFactory.loadChat(message_repack, function (data){
                $rootScope.chat = data;
                $location.path('/messages')
            })
            })
            })
            $scope.message = {};
        }
        $scope.redirectMessage = function(userId, contactId, contactName){
            delete $rootScope.reqMessage;
            delete $rootScope.findusers
            delete $rootScope.existingContact
            chat_repack = {
                userId: userId,
                contactId: contactId,
                contactName: contactName
            }
            messageFactory.loadChat(chat_repack, function (data){
                $rootScope.chat = data;
                $location.path('/messages')
            })
        }
        $scope.deleteMessage = function(msgId, userId, contactId, contactName,tMessage,oMessage){
            chat_repack = {
                messageId: msgId,
                userId: userId,
                contactId: contactId,
                contactName: contactName,
                tMessage: tMessage,
                oMessage: oMessage
            }
            messageFactory.deleteMessage(chat_repack, function (data){
            messageFactory.loadChat(chat_repack, function (data){
                $rootScope.chat = data;
                $location.path('/messages')
            })
            })
        }
})