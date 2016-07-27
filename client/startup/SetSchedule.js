Template.SetSchedule.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes');
  });
});

Template.SetSchedule.helpers({
  machines: ()=> {
    return Machines.find({});
  },
  routes: ()=> {
    return Routes.find({});
  }
});


Template.SetSchedule.events({
  'submit form' : function (event, template) {

      event.preventDefault();
      var routeNameVar = event.target.RouteName.value;
      // var all_machines = Machines.distinct("_id");
      var all_machines = _.uniq(Machines.find({}, {sort: {"_id": 1}, fields: {"_id": true}}).fetch().map(function(x) {return x._id;}), true);
      Routes.insert({
        name: routeNameVar,
        machines: all_machines
      });
      FlowRouter.go('/set_daily_ticket');
  }
});
