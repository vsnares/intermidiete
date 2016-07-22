Template.MachineSchedule.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes');
  });
});

Template.MachineSchedule.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  routes: ()=> {
    return Routes.find({});
  }
});


Template.MachineSchedule.events({
  'change [type=checkbox]': function(event, template){
    event.preventDefault();
    var selected = template.findAll( "input[type=checkbox]:checked");
    var array = _.map(selected, function(item) {
      return item.defaultValue;
    });
    Machines.update(this._id, {
      $set: {schedule_days: []},
      $set: { schedule_days: array }
    });
  }
});
