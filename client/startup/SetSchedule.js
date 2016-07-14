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
  'click .done' : function (event) {
      FlowRouter.go('/set_daily_ticket');
  }
});
