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
  },
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
