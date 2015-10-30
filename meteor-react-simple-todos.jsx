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
    const task = Tasks.findOne(taskId);
    if(task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
  },
  
  setChecked(taskId, flag) {
    const task = Tasks.findOne(taskId);
    if(task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, {$set: {checked: flag}});
  },
  
  setPrivate(taskId, flag) {
    const task = Tasks.findOne(taskId);
    if(task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, {$set: {private: flag}})
  }
  
});


// CLIENT
if(Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  Meteor.subscribe("tasks");
  
  Meteor.startup(function() {
    React.render(<App />, document.getElementById("react-target"));
  });
  
}


// SERVER
if(Meteor.isServer) {
  Meteor.publish("tasks", function() {
    return Tasks.find({
      $or: [
        {private: {$ne: true}},
        {owner: this.userId}
      ]
    });
  });
}
