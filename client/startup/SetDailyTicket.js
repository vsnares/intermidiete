Template.SetDailyTicket.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('machines');
    self.subscribe('routes');
  });
});

Template.SetDailyTicket.rendered = function() {
  Meteor.typeahead.inject();
};


Template.SetDailyTicket.helpers({
  machine: function() {
    return Machines.find().fetch().map(function(it){ return it.name; });
  }
});

Template.SetDailyTicket.events({
  'submit form': function(event, template) {
      event.preventDefault();
      var machineNameVar = event.target.machineName.value;
      var moneyCollectedVar = event.target.moneyCollected.value;

      console.log(machineNameVar);
      console.log(moneyCollectedVar);

      Machines.findAndModify({
        query: { name: machineNameVar },
        update: { $push: { daily_tickets: {amount: moneyCollectedVar}}},
        upsert: true
      });
      template.find("form").reset();
  }

  // 'click .save' : function (event) {
  //     FlowRouter.go('/set_schedule');
  // }
});
