Tasks = new Mongo.Collection("tasks");

// CLIENT
if(Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  Meteor.startup(function() {
    React.render(<App />, document.getElementById("react-target"));
  });
  
}