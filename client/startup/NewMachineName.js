Template.NewMachineName.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes')
  });
});

Template.NewMachineName.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  routes: ()=> {
    return Routes.find({});
  }
});

Template.NewMachineName.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var selected = template.findAll( "input[type=checkbox]:checked");
      var array = _.map(selected, function(item) {
        return item.defaultValue;
      });
      var machineNameVar = event.target.machineName.value;

      var insertedMachineId = Machines.insert({
        name: machineNameVar
      });

      array.forEach(function(itemId, i, arr) {
        Routes.update(itemId, {
          $push: { machines: insertedMachineId },
        });
      });
      template.find("form").reset();
  },

  'click .done' : function (event) {
      FlowRouter.go('/set_schedule');
  },

  'click .asign_to_route' : function (event) {
    Session.set('AsignToRouteMode', !Session.get('AsignToRouteMode'));
  }
});
