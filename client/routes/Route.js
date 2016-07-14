Template.Route.helpers({
  route: function() {
    return Routes.findOne();
  },
  getMachineName: function(machineId) {
    return Machines.findOne(machineId).name;
  }
});

Template.Route.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleRoute', id);
    self.subscribe('machines');
  });
});
