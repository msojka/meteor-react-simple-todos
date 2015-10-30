Tasks = new Mongo.Collection("tasks");


// METHODS
Meteor.methods({
  
  addTask(text) {
    if(!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  
  removeTask(taskId) {
    Tasks.remove(taskId);
  },
  
  setChecked(taskId, checked) {
    Tasks.update(taskId, {$set: {cehcked: checked}});
  }
  
});


// CLIENT
if(Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  Meteor.startup(function() {
    React.render(<App />, document.getElementById("react-target"));
  });
  
}
