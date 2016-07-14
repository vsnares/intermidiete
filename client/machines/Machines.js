Template.Machines.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
  });
});

Template.Machines.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  machineRoutes: function(machineId) {
    return Routes.find({
      machines: {
        $in: [ machineId ]
      }
    });
  }
});
