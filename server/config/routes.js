var users = require('../controllers/users.js');
var requests = require('../controllers/requests.js');
var contacts = require('../controllers/contacts.js');
var messages = require('../controllers/messages.js');
var chats = require('../controllers/chats.js');

  module.exports = function(app) {
    app.post('/create', function (req,res){
      users.create(req, res)
    }),
    app.post('/login', function (req,res){
      users.login(req,res)
    }),
    app.post('/find', function (req, res){
    	users.find(req,res)
    }),
    app.post('/request', function (req, res){
    	requests.send(req,res)
    }),
    app.post('/get_requests', function (req, res){
    	requests.get_requests(req, res)
    }),
    app.post('/add_contact', function (req, res){
    	contacts.add_contact(req, res);
    }),
    app.post('/get_contacts', function (req, res){
    	contacts.get_contacts(req, res);
    }),
    app.post('/save_message', function (req, res){
    	messages.save_message(req, res);
    }),
    app.post('/loadChat', function (req, res){
        chats.loadChat(req,res);
    }),
    app.post('/findcontacts', function (req, res){
        contacts.userFind(req,res);
    }),
    app.post('/delete_message', function (req, res){
        messages.delete_message(req, res);
    })
};