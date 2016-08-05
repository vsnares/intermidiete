Template.Menu.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
  });
});

Template.Menu.helpers({
  machines: ()=> {
    return Machines.find({cheked: true});
  }
});
