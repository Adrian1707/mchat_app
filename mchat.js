Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Template.messages.helpers({
    messages: function () {
      return Messages.find();
    }
  });

  Template.messages.events({
    'keypress textarea': function(e, event){
      if (e.keyCode == 13) { // enter key pressed
        e.preventDefault();
        var value = event.find('textarea').value;
        event.find('textarea').value = '';

        Messages.insert({
          message: value,
          timestamp: new Date(),
          user: Meteor.userId()
        });
      }
    }
  });

  Template.message.helpers({
    user: function() {
      return Meteor.users.findOne({_id: this.user});
    },
    time: function(){
      return moment(this.timestamp).format("h:mm a"); //this syntax requires the Meteor moments package. Run Meteor add momentjs:moment in the command line
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL" //this syntax is from Account
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
