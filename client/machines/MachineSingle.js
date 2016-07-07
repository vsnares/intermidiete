Template.MachineSingle.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleMachine', id);
  });
});

Template.MachineSingle.helpers({
  machine: ()=> {
    var id = FlowRouter.getParam('id');
    return Machines.findOne({_id: id});
  }
});
